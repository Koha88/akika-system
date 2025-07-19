#!/usr/bin/env bash
set -euo pipefail

# Установка PHP и зависимостей
apt-get update
apt-get install -y php php-mbstring php-xml php-intl php-gd php-zip php-curl php-mysql unzip git curl

# Установка Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# Установка Node.js и npm
apt-get install -y nodejs npm

# Установка зависимостей Laravel
composer install --no-interaction --prefer-dist --optimize-autoloader
npm install

# Копирование .env и установка ключа
cp .env.example .env || true
php artisan key:generate

# Создание SQLite базы (для простоты в Codex)
touch database/database.sqlite
sed -i 's/DB_CONNECTION=.*/DB_CONNECTION=sqlite/' .env
sed -i '/DB_HOST/d' .env
sed -i '/DB_PORT/d' .env
sed -i '/DB_DATABASE/d' .env
sed -i '/DB_USERNAME/d' .env
sed -i '/DB_PASSWORD/d' .env

# Применяем миграции
php artisan migrate --force

# Сборка фронтенда
npm run build
