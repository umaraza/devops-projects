FROM php:8.5-fpm-alpine

RUN apk add --no-cache nginx unzip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /var/www/html
COPY . .

# Install with dev packages (Faker is needed for seeding), build and seed the
# SQLite database, then remove the dev packages and cache the config
RUN composer install --optimize-autoloader --no-interaction \
 && cp .env.docker .env \
 && touch storage/database.sqlite \
 && php artisan key:generate --force \
 && php artisan migrate --force \
 && php artisan db:seed --force \
 && composer install --no-dev --optimize-autoloader --no-interaction \
 && php artisan storage:link \
 && php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache \
 && chown -R www-data:www-data storage bootstrap/cache

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
CMD ["/start.sh"]
