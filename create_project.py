import os

TARGET_DIR = r"c:\Users\islam\Desktop\ParseCABot"

files = {}

# config.py
files['config.py'] = '''import os
from dotenv import load_dotenv
load_dotenv()
API_ID = int(os.getenv("TELEGRAM_API_ID", "0"))
API_HASH = os.getenv("TELEGRAM_API_HASH", "")
PHONE = os.getenv("TELEGRAM_PHONE", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
KEYWORDS = ["авито", "avito", "wildberries", "ozon", "маркетплейсы", "селлеры", "продавцы", "товарка", "перепродажа", "бизнес", "продажи"]
MIN_MESSAGES_FOR_QUALIFY = 3
MAX_MESSAGES_PER_USER = 20
BATCH_SIZE = 50
QUALIFY_MODEL = "gpt-4o-mini"
OFFER_MODEL = "gpt-4o-mini"
DATABASE_PATH = "database.db"
SESSION_NAME = "parser_session"
'''

# database.py
files['database.py'] = '''import sqlite3
from datetime import datetime
import json
from contextlib import contextmanager

DATABASE_PATH = "database.db"

@contextmanager
def get_db():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    with get_db() as conn:
        c = conn.cursor()
        c.execute("CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY, telegram_id INTEGER UNIQUE, title TEXT, username TEXT, members_count INTEGER, parsed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
        c.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, telegram_id INTEGER UNIQUE, username TEXT, first_name TEXT, last_name TEXT, bio TEXT, is_bot INTEGER DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
        c.execute("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, telegram_id INTEGER, user_id INTEGER, chat_id INTEGER, text TEXT, date TIMESTAMP)")
        c.execute("CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY, user_id INTEGER UNIQUE, score INTEGER, keywords TEXT, problem TEXT, ai_analysis TEXT, offer_text TEXT, status TEXT DEFAULT 'new', contacted_at TIMESTAMP)")
        c.execute("CREATE TABLE IF NOT EXISTS ai_cache (id INTEGER PRIMARY KEY, cache_key TEXT UNIQUE, result TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
        conn.commit()
        print("Database initialized")

def save_chat(telegram_id, title, username, members_count):
    with get_db() as conn:
        conn.cursor().execute("INSERT OR REPLACE INTO chats (telegram_id, title, username, members_count, parsed_at) VALUES (?, ?, ?, ?, ?)", (telegram_id, title, username, members_count, datetime.now()))
        conn.commit()

def save_user(telegram_id, username, first_name, last_name, bio, is_bot):
    with get_db() as conn:
        conn.cursor().execute("INSERT OR REPLACE INTO users (telegram_id, username, first_name, last_name, bio, is_bot) VALUES (?, ?, ?, ?, ?, ?)", (telegram_id, username, first_name, last_name, bio, 1 if is_bot else 0))
        conn.commit()

def get_user_by_id(telegram_id):
    with get_db() as conn:
        return conn.cursor().execute("SELECT * FROM users WHERE telegram_id = ?", (telegram_id,)).fetchone()

def save_message(telegram_id, user_id, chat_id, text, date):
    with get_db() as conn:
        conn.cursor().execute("INSERT OR REPLACE INTO messages (telegram_id, user_id, chat_id, text, date) VALUES (?, ?, ?, ?, ?)", (telegram_id, user_id, chat_id, text, date))
        conn.commit()

def get_user_messages(user_id, limit=20):
    with get_db() as conn:
        return conn.cursor().execute("SELECT text, date FROM messages WHERE user_id = ? ORDER BY date DESC LIMIT ?", (user_id, limit)).fetchall()

def get_all_users_with_messages():
    with get_db() as conn:
        return conn.cursor().execute("SELECT u.id, u.telegram_id, u.username, u.first_name, u.last_name, u.bio, COUNT(m.id) as msg_count FROM users u LEFT JOIN messages m ON u.id = m.user_id GROUP BY u.id HAVING msg_count >= 3").fetchall()

def save_lead(user_id, score, keywords, problem, ai_analysis):
    with get_db() as conn:
        conn.cursor().execute("INSERT OR REPLACE INTO leads (user_id, score, keywords, problem, ai_analysis, status) VALUES (?, ?, ?, ?, ?, 'new')", (user_id, score, json.dumps(keywords), problem, json.dumps(ai_analysis)))
        conn.commit()

def get_lead(user_id):
    with get_db() as conn:
        return conn.cursor().execute("SELECT * FROM leads WHERE user_id = ?", (user_id,)).fetchone()

def get_leads_by_score(min_score):
    with get_db() as conn:
        return conn.cursor().execute("SELECT l.*, u.username, u.first_name, u.last_name, u.bio FROM leads l JOIN users u ON l.user_id = u.id WHERE l.score >= ? ORDER BY l.score DESC", (min_score,)).fetchall()

def update_lead_offer(user_id, offer_text):
    with get_db() as conn:
        conn.cursor().execute("UPDATE leads SET offer_text = ?, contacted_at = ? WHERE user_id = ?", (offer_text, datetime.now(), user_id))
        conn.commit()

def update_lead_status(user_id, status):
    with get_db() as conn:
        conn.cursor().execute("UPDATE leads SET status = ? WHERE user_id = ?", (status, user_id))
        conn.commit()

def get_ai_cache(cache_key):
    with get_db() as conn:
        row = conn.cursor().execute("SELECT result FROM ai_cache WHERE cache_key = ?", (cache_key,)).fetchone()
        return json.loads(row["result"]) if row else None

def save_ai_cache(cache_key, result):
    with get_db() as conn:
        conn.cursor().execute("INSERT OR REPLACE INTO ai_cache (cache_key, result, created_at) VALUES (?, ?, ?)", (cache_key, json.dumps(result), datetime.now()))
        conn.commit()

if __name__ == "__main__":
    init_db()
'''

# chat_search.py
files['chat_search.py'] = '''from telethon import TelegramClient
from telethon.tl.functions.messages import SearchGlobalRequest
import database as db

async def search_chats_by_keyword(client, query, limit=20):
    try:
        results = await client(SearchGlobalRequest(q=query, limit=limit, offset_rate=0, offset_peer=None, offset_id=0))
        chats = []
        for chat in results.chats:
            if hasattr(chat, "title"):
                mc = getattr(chat, "participants_count", 0)
                chat_data = {"telegram_id": chat.id, "title": chat.title, "username": getattr(chat, "username", None), "members_count": mc}
                chats.append(chat_data)
                db.save_chat(chat_data["telegram_id"], chat_data["title"], chat_data["username"], chat_data["members_count"])
        return chats
    except Exception as e:
        print(f"Error searching '{query}': {e}")
        return []

async def search_all_keywords(client, keywords, limit_per_keyword=10):
    all_chats = {}
    for kw in keywords:
        print(f"Search: {kw}")
        chats = await search_chats_by_keyword(client, kw, limit_per_keyword)
        for c in chats:
            all_chats[c["telegram_id"]] = c
        print(f"  Found: {len(chats)}")
    print(f"Total unique chats: {len(all_chats)}")
    return list(all_chats.values())
'''

# parser.py
files['parser.py'] = '''from telethon import TelegramClient
import database as db

async def parse_chat_messages(client, chat_identifier, limit=1000):
    try:
        chat = await client.get_entity(chat_identifier)
        chat_id = chat.id
        db.save_chat(chat_id, chat.title, getattr(chat, "username", None), getattr(chat, "participants_count", 0))
        users_parsed = set()
        messages_count = 0
        print(f"Parsing: {chat.title}")
        async for message in client.iter_messages(chat, limit=limit):
            sender = message.sender
            if not sender or (hasattr(sender, "bot") and sender.bot):
                continue
            user_id = sender.id
            if user_id not in users_parsed:
                db.save_user(user_id, getattr(sender, "username", None), getattr(sender, "first_name", None), getattr(sender, "last_name", None), getattr(sender, "bio", None), getattr(sender, "bot", False))
                users_parsed.add(user_id)
            if message.text:
                db.save_message(message.id, user_id, chat_id, message.text, message.date)
                messages_count += 1
            if messages_count % 100 == 0:
                print(f"  Messages: {messages_count}, Users: {len(users_parsed)}")
        print(f"Done! Messages: {messages_count}, Users: {len(users_parsed)}")
        return {"messages": messages_count, "users": len(users_parsed)}
    except Exception as e:
        print(f"Error parsing {chat_identifier}: {e}")
        return {"messages": 0, "users": 0, "error": str(e)}

async def parse_multiple_chats(client, chats, messages_limit=1000):
    total = {"messages": 0, "users": 0, "chats_processed": 0}
    for chat in chats:
        cid = chat.get("telegram_id") or chat.get("username") or chat.get("title")
        if not cid:
            continue
        result = await parse_chat_messages(client, cid, messages_limit)
        if "error" not in result:
            total["messages"] += result.get("messages", 0)
            total["users"] += result.get("users", 0)
            total["chats_processed"] += 1
    print(f"Total: {total['chats_processed']} chats, {total['messages']} messages, {total['users']} users")
    return total
'''

# ai_agent.py
files['ai_agent.py'] = '''import openai
import json
import hashlib
from config import OPENAI_API_KEY, QUALIFY_MODEL, OFFER_MODEL, BATCH_SIZE
import database as db

client = openai.OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

QUALIFY_PROMPT = """Rate users for Avito/Wildberries/Ozon automation service. Analyze their chat messages.
Return ONLY JSON array: [{"id": 12345, "score": 0-100, "keywords": ["avito"], "problem": "brief"}]
Score criteria:
- 80-100: Questions about automation, bulk operations, complaints about manual work
- 50-79: Marketplace mentions, sales questions
- 20-49: General business questions
- 0-19: Spam, off-topic, service providers

Users:
{users_batch}
"""

OFFER_PROMPT = """Generate personalized offer (3-4 sentences) for seller.
Profile: {name}, Bio: {bio}, Problem: {problem}, Interests: {keywords}
Service: Avito/Wildberries/Ozon automation (auto-posting, bulk upload, price updates)
Return ONLY offer text without headers.
"""

def generate_cache_key(data):
    return hashlib.md5(json.dumps(data, sort_keys=True).encode()).hexdigest()

def format_user(u):
    msgs = chr(10).join([f"  - {m}" for m in u["messages"]])
    return f"User ID: {u['id']}" + chr(10) + "Messages:" + chr(10) + msgs

async def qualify_users_batch(batch):
    if not client:
        print("No OpenAI API key!")
        return []
    prompt = QUALIFY_PROMPT.format(users_batch=chr(10)*2.join([format_user(u) for u in batch]))
    try:
        resp = client.chat.completions.create(model=QUALIFY_MODEL, messages=[{"role":"system","content":"Return only JSON"},{"role":"user","content":prompt}], temperature=0.3, max_tokens=500)
        return json.loads(resp.choices[0].message.content.strip())
    except Exception as e:
        print(f"AI error: {e}")
        return []

async def qualify_all_users():
    users = db.get_all_users_with_messages()
    print(f"Users to qualify: {len(users)}")
    batches = []
    for i in range(0, len(users), BATCH_SIZE):
        batch = []
        for u in users[i:i+BATCH_SIZE]:
            msgs = db.get_user_messages(u["id"], limit=20)
            if msgs:
                batch.append({"id": u["telegram_id"], "username": u["username"], "messages": [m["text"] for m in msgs if m["text"]]})
        if batch:
            batches.append(batch)
    print(f"Batches: {len(batches)}")
    all_results = []
    for i, batch in enumerate(batches):
        print(f"Batch {i+1}/{len(batches)}")
        cache_key = generate_cache_key(batch)
        cached = db.get_ai_cache(cache_key)
        if cached:
            print("  From cache")
            all_results.extend(cached)
            continue
        results = await qualify_users_batch(batch)
        if results:
            db.save_ai_cache(cache_key, results)
            for r in results:
                db.save_lead(r["id"], r["score"], r.get("keywords",[]), r.get("problem",""), {"score":r["score"],"keywords":r.get("keywords",[])})
            all_results.extend(results)
            print(f"  Done: {len(results)}, avg score: {sum(r['score'] for r in results)/len(results):.1f}")
    return all_results

async def generate_offer(user_id):
    if not client:
        return None
    user = db.get_user_by_id(user_id)
    lead = db.get_lead(user_id)
    if not user or not lead:
        return None
    prompt = OFFER_PROMPT.format(name=user["first_name"] or user["username"] or "Client", bio=user["bio"] or "N/A", problem=lead["problem"], keywords=", ".join(json.loads(lead["keywords"])) if lead["keywords"] else "automation")
    try:
        resp = client.chat.completions.create(model=OFFER_MODEL, messages=[{"role":"system","content":"Sales manager"},{"role":"user","content":prompt}], temperature=0.5, max_tokens=200)
        offer = resp.choices[0].message.content.strip()
        db.update_lead_offer(user_id, offer)
        return offer
    except Exception as e:
        print(f"Offer error: {e}")
        return None

async def generate_offers_for_leads(min_score=70):
    leads = db.get_leads_by_score(min_score)
    print(f"Leads for offers: {len(leads)}")
    results = []
    for lead in leads:
        if not lead["offer_text"]:
            offer = await generate_offer(lead["user_id"])
            if offer:
                results.append({"user_id": lead["user_id"], "offer": offer})
        else:
            results.append({"user_id": lead["user_id"], "offer": lead["offer_text"]})
    return results
'''

# messenger.py
files['messenger.py'] = '''from telethon import TelegramClient
import database as db
import asyncio

async def send_message_to_user(client, user_id, message):
    try:
        user = await client.get_entity(user_id)
        await client.send_message(user, message)
        print(f"Sent to @{user.username or user_id}")
        return True
    except Exception as e:
        print(f"Error sending to {user_id}: {e}")
        return False

async def send_offers_batch(client, min_score=70, delay_seconds=30):
    leads = db.get_leads_by_score(min_score)
    print(f"Leads to contact: {len(leads)}")
    success, fail = 0, 0
    for lead in leads:
        if lead["status"] == "contacted":
            continue
        if not lead["offer_text"]:
            continue
        result = await send_message_to_user(client, lead["user_id"], lead["offer_text"])
        if result:
            db.update_lead_status(lead["user_id"], "contacted")
            success += 1
        else:
            fail += 1
        if delay_seconds > 0:
            await asyncio.sleep(delay_seconds)
    print(f"Done! Success: {success}, Failed: {fail}")
    return {"success": success, "failed": fail}
'''

# main.py
files['main.py'] = '''import asyncio
from telethon import TelegramClient
from config import API_ID, API_HASH, PHONE, KEYWORDS, SESSION_NAME
import database as db
import chat_search
import parser
import ai_agent
import messenger

async def main():
    db.init_db()
    client = TelegramClient(SESSION_NAME, API_ID, API_HASH)
    await client.start(phone=PHONE)
    print("Authorized!")
    print("\\n=== Search Chats ===")
    chats = await chat_search.search_all_keywords(client, KEYWORDS, limit_per_keyword=10)
    print("\\n=== Parse Chats ===")
    await parser.parse_multiple_chats(client, chats, messages_limit=1000)
    print("\\n=== Qualify Leads ===")
    await ai_agent.qualify_all_users()
    print("\\n=== Generate Offers ===")
    await ai_agent.generate_offers_for_leads(min_score=70)
    # Uncomment for mailing:
    # print("\\n=== Send Offers ===")
    # await messenger.send_offers_batch(client, min_score=80, delay_seconds=30)
    await client.disconnect()
    print("\\nDone!")

if __name__ == "__main__":
    asyncio.run(main())
'''

# requirements.txt
files['requirements.txt'] = '''telethon==1.34.0
openai==1.12.0
python-dotenv==1.0.1
aiofiles==23.2.1
requests==2.31.0
beautifulsoup4==4.12.3
'''

# .env.example
files['.env.example'] = '''# Telegram API - get from https://my.telegram.org/apps
TELEGRAM_API_ID=12345678
TELEGRAM_API_HASH=abcdef1234567890abcdef1234567890
TELEGRAM_PHONE=+79991234567

# OpenAI API - get from https://platform.openai.com
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
'''

# README.md
files['README.md'] = '''# ParseCABot - Telegram Parser for Lead Generation

Automated search and qualification of leads from Telegram chats:
- Avito sellers, Wildberries, Ozon, Marketplaces, Resellers

## Installation

1. pip install -r requirements.txt

2. copy .env.example .env

3. Fill .env with API keys from Telegram and OpenAI

## Usage

python main.py

## Files

- config.py - settings and keywords
- database.py - SQLite operations
- chat_search.py - search chats by keywords
- parser.py - parse messages from chats
- ai_agent.py - AI lead qualification (batching + caching)
- messenger.py - send offers
- main.py - entry point

## Cost per 10K users: ~$0.26 (GPT-4o-mini)
'''

# Create all files
for filename, content in files.items():
    filepath = os.path.join(TARGET_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created: {filename}")

print("\\nAll files created!")
