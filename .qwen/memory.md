# ParseCABot — Проект Telegram Парсера

**Дата создания:** 5 марта 2026  
**Назначение:** Автоматический поиск и квалификация лидов из Telegram-чатов для сервиса автоматизации селлеров на Авито/Wildberries/Ozon

---

## 📁 Расположение проекта

```
c:\Users\islam\Desktop\ParseCABot\
├── config.py           # Настройки и ключевые слова
├── database.py         # SQLite операции
├── chat_search.py      # Поиск чатов по ключевым словам
├── parser.py           # Парсинг сообщений из чатов
├── ai_agent.py         # ИИ квалификация (батчинг + кэширование)
├── messenger.py        # Рассылка персональных предложений
├── main.py             # Точка входа
├── requirements.txt    # Python зависимости
├── .env.example        # Шаблон конфига
├── .env                # Рабочий конфиг (заполняет пользователь)
├── README.md           # Документация
└── database.db         # SQLite база данных
```

---

## 🎯 Цель проекта

Парсер собирает пользователей из тематических Telegram-чатов (селлеры Авито, Wildberries, Ozon, маркетплейсы, реселлеры), анализирует их сообщения через ИИ, оценивает потенциал лида (score 0-100) и генерирует персональные коммерческие предложения.

---

## 🔧 Технологии

| Компонент | Технология |
|-----------|------------|
| Язык | Python 3.12 |
| Telegram API | Telethon 1.34.0 |
| ИИ | OpenAI GPT-4o-mini |
| База данных | SQLite |
| ORM | Нативный sqlite3 |

---

## 📊 Архитектура работы

```
1. Поиск чатов по ключевым словам (Telegram Global Search)
         ↓
2. Парсинг последних 1000 сообщений из каждого чата
         ↓
3. Фильтрация: пользователи с ≥3 сообщениями
         ↓
4. ИИ квалификация (батчинг по 50 юзеров + кэширование)
         ↓
5. Генерация КП только по запросу (score ≥ 70)
         ↓
6. Рассылка (опционально, с задержкой 30 сек)
```

---

## 🗝️ Ключевые слова для поиска чатов

```python
KEYWORDS = [
    "авито", "avito", "wildberries", "ozon", "маркетплейсы",
    "селлеры", "продавцы", "товарка", "перепродажа",
    "бизнес", "продажи", "реселлеры", "китай товары"
]
```

---

## 💰 Стоимость (оптимизировано)

| Операция | Расходы на 10K пользователей |
|----------|-----------------------------|
| Простая фильтрация | $0 (правила) |
| ИИ квалификация (батчинг + кэш) | ~$0.06 |
| Генерация 100 КП | ~$0.20 |
| **ИТОГО** | **~$0.26** |

---

## 🔑 API ключи (требуются)

| Ключ | Где получить | Статус |
|------|--------------|--------|
| `TELEGRAM_API_ID` | https://my.telegram.org/apps | ⏳ Ожидает настройки |
| `TELEGRAM_API_HASH` | https://my.telegram.org/apps | ⏳ Ожидает настройки |
| `TELEGRAM_PHONE` | Номер пользователя | ⏳ Ожидает настройки |
| `OPENAI_API_KEY` | https://platform.openai.com/api-keys | ⏳ Ожидает настройки |

---

## 📝 Структура базы данных

### Таблицы:

**chats** — найденные чаты
- id, telegram_id, title, username, members_count, parsed_at

**users** — пользователи
- id, telegram_id, username, first_name, last_name, bio, is_bot, created_at

**messages** — сообщения
- id, telegram_id, user_id, chat_id, text, date

**leads** — квалифицированные лиды
- id, user_id, score, keywords (JSON), problem, ai_analysis (JSON), offer_text, status, contacted_at

**ai_cache** — кэш ИИ запросов
- id, cache_key, result (JSON), created_at

---

## 🚀 Команды запуска

```bash
# Перейти в папку проекта
cd /d "c:\Users\islam\Desktop\ParseCABot"

# Установить зависимости
pip install -r requirements.txt

# Инициализировать БД
python -c "import database; database.init_db()"

# Запустить полный цикл
python main.py

# Только квалификация
python -c "import asyncio; from ai_agent import qualify_all_users; asyncio.run(qualify_all_users())"

# Генерация КП для лидов score >= 70
python -c "import asyncio; from ai_agent import generate_offers_for_leads; asyncio.run(generate_offers_for_leads(70))"

# Просмотр лидов
python -c "import database as db; leads = db.get_leads_by_score(70); print(f'Лидов: {len(leads)}')"
```

---

## ⚙️ Конфигурация (.env)

```env
# Telegram API
TELEGRAM_API_ID=12345678
TELEGRAM_API_HASH=abcdef1234567890abcdef1234567890
TELEGRAM_PHONE=+79991234567

# OpenAI API
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
```

---

## 🎯 Критерии квалификации лидов

| Score | Критерии |
|-------|----------|
| 80-100 | Вопросы про автоматизацию, массовые операции, жалобы на ручную работу |
| 50-79 | Упоминания маркетплейсов, вопросы про продажи |
| 20-49 | Общие вопросы про бизнес |
| 0-19 | Флуд, оффтоп, предложения услуг, спам |

---

## 📦 Зависимости (requirements.txt)

```
telethon==1.34.0
openai==1.12.0
python-dotenv==1.0.1
aiofiles==23.2.1
requests==2.31.0
beautifulsoup4==4.12.3
```

---

## ⚠️ Важные заметки

1. **Telegram API** — при создании приложения может выдавать "ERROR". Решение: пробовать позже, другой браузер, точные значения полей.

2. **Флуд-лимиты Telegram** — при рассылке делать задержку 30+ секунд между сообщениями.

3. **Кэширование ИИ** — результаты квалификации кэшируются по хешу данных, повторные запросы бесплатны.

4. **Батчинг** — 50 пользователей в одном запросе к ИИ для экономии токенов.

5. **Рассылка закомментирована** — в main.py раскомментировать строку с `messenger.send_offers_batch()` для включения.

---

## 📈 Следующие улучшения (идеи)

- [ ] Добавить парсинг каталогов чатов (tgstat.ru, telemetr.me)
- [ ] ML-фильтрация перед ИИ (scikit-learn)
- [ ] Экспорт лидов в CSV/Excel
- [ ] Веб-интерфейс для просмотра лидов
- [ ] Интеграция с CRM
- [ ] A/B тестирование текстов КП

---

## 📞 Контакты и доступы

Пользователь: islam  
Рабочая директория: `c:\Users\islam\Desktop\ParseCABot`  
Язык вывода: Русский (код и пути не переводить)

---

*Памятка создана 5 марта 2026 в ходе сессии разработки ParseCABot*
