# Инструкция по деплою GMLB на VPS (Beget)

## Требования к серверу

- Ubuntu 22.04+ или Debian 12+
- Node.js 20+ (рекомендуется 20 LTS)
- PostgreSQL 16+
- Минимум 1 ГБ RAM, 10 ГБ диска
- Домен с настроенным DNS (A-запись → IP сервера)

---

## Шаг 1. Подключение к серверу

```bash
ssh root@ВАШ_IP_СЕРВЕРА
```

---

## Шаг 2. Установка Node.js

```bash
# Установка Node.js 20 LTS через NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка
node -v  # должно быть v20.x.x
npm -v
```

---

## Шаг 3. Установка PostgreSQL

```bash
sudo apt-get install -y postgresql postgresql-contrib

# Запуск
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Создание базы данных
sudo -u postgres psql -c "CREATE DATABASE gmlb;"
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'ПРИДУМАЙТЕ_НАДЁЖНЫЙ_ПАРОЛЬ';"
```

---

## Шаг 4. Установка PM2

```bash
sudo npm install -g pm2
```

---

## Шаг 5. Загрузка проекта на сервер

### Вариант A: Через Git (рекомендуется)

```bash
# На сервере
cd /var/www
git clone ВАШ_РЕПОЗИТОРИЙ gmlb-site
cd gmlb-site
```

### Вариант B: Через SCP (копирование файлов)

```bash
# На вашем компьютере (не на сервере!)
# Сначала создайте архив (без node_modules и .next)
tar --exclude='node_modules' --exclude='.next' -czf gmlb-site.tar.gz .

# Скопируйте на сервер
scp gmlb-site.tar.gz root@ВАШ_IP:/var/www/

# На сервере
cd /var/www
mkdir gmlb-site && cd gmlb-site
tar -xzf ../gmlb-site.tar.gz
rm ../gmlb-site.tar.gz
```

---

## Шаг 6. Настройка переменных окружения

```bash
cd /var/www/gmlb-site

# Создайте файл .env.local
nano .env.local
```

Содержимое `.env.local`:

```env
# Payload CMS
PAYLOAD_SECRET=ДЛИННАЯ_СЛУЧАЙНАЯ_СТРОКА_МИНИМУМ_32_СИМВОЛА
DATABASE_URI=postgresql://postgres:ВАШ_ПАРОЛЬ_БД@localhost:5432/gmlb

# Telegram
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id

# Сайт
NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru
NEXT_PUBLIC_TELEGRAM_MANAGER=@ваш_telegram
```

---

## Шаг 7. Установка и сборка

```bash
cd /var/www/gmlb-site

# Установка зависимостей
npm install

# Сборка проекта (это займёт 1-3 минуты)
npm run build
```

---

## Шаг 7.5. Создание первого администратора Payload

После сборки запустите сервер **один раз** в режиме разработки, чтобы создать первого пользователя:

```bash
cd /var/www/gmlb-site

# Запустить временно (Ctrl+C после создания пользователя)
NODE_ENV=production node_modules/.bin/next start &
```

Откройте в браузере `http://ВАШ_IP:3000/admin` и заполните форму создания первого пользователя (email + пароль). После этого остановите процесс (`fg`, затем `Ctrl+C`) и переходите к PM2.

> **Важно:** Это нужно сделать только один раз при первом запуске. Данные сохраняются в PostgreSQL.

---

## Шаг 8. Запуск через PM2

```bash
# Запуск
pm2 start npm --name "gmlb-site" -- start

# Автозапуск при перезагрузке сервера
pm2 startup
pm2 save

# Полезные команды PM2:
# pm2 status          — статус процессов
# pm2 logs gmlb-site  — логи
# pm2 restart gmlb-site — перезапуск
# pm2 stop gmlb-site  — остановка
```

---

## Шаг 9. Настройка Nginx (reverse proxy)

```bash
sudo apt-get install -y nginx

# Создайте конфиг
sudo nano /etc/nginx/sites-available/gmlb-site
```

Содержимое конфига:

```nginx
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

    # Перенаправление на HTTPS (после настройки SSL)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Статические файлы Next.js
    location /_next/static/ {
        alias /var/www/gmlb-site/.next/static/;
        expires 365d;
        access_log off;
    }

    location /media/ {
        alias /var/www/gmlb-site/media/;
        expires 30d;
        access_log off;
    }
}
```

Активация:

```bash
sudo ln -s /etc/nginx/sites-available/gmlb-site /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # удалить дефолтный сайт
sudo nginx -t  # проверка конфига
sudo systemctl restart nginx
```

---

## Шаг 10. Настройка SSL (HTTPS)

```bash
# Установка Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru

# Автообновление (уже настроено Certbot, но проверим)
sudo certbot renew --dry-run
```

После SSL раскомментируйте строку `return 301 https://...` в конфиге Nginx и перезапустите:

```bash
sudo systemctl restart nginx
```

---

## Обновление сайта

Когда вы внесли изменения в код или контент:

```bash
cd /var/www/gmlb-site

# Если используете Git
git pull

# Установка новых зависимостей (если изменился package.json)
npm install

# Пересборка
npm run build

# Перезапуск
pm2 restart gmlb-site
```

---

## Создание Telegram-бота (инструкция)

1. Откройте Telegram, найдите `@BotFather`
2. Отправьте `/newbot`
3. Введите имя бота (например: `GMLB Leads Bot`)
4. Введите username бота (например: `gmlb_leads_bot`)
5. Скопируйте **токен** — это ваш `TELEGRAM_BOT_TOKEN`
6. Найдите бота `@userinfobot` или `@getmyid_bot`
7. Отправьте ему любое сообщение — он вернёт ваш **chat_id**
8. Впишите оба значения в `.env.local`
9. Перезапустите: `pm2 restart gmlb-site`

---

## Решение проблем

### Сайт не открывается
```bash
pm2 status              # проверьте статус
pm2 logs gmlb-site      # посмотрите логи
sudo systemctl status nginx  # проверьте Nginx
```

### Ошибка подключения к БД
```bash
sudo systemctl status postgresql  # PostgreSQL запущен?
psql -U postgres -h localhost -d gmlb  # можно подключиться?
```

### Порт 3000 занят
```bash
lsof -i :3000  # кто занимает порт
pm2 delete all  # остановить все процессы
pm2 start npm --name "gmlb-site" -- start  # запустить снова
```
