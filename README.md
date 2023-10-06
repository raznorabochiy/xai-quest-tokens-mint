# Скрипт минтит Xai Quest Tokens

Для запуска скрипта нужен Node.js, если ещё не установлен, устанавливаем с
https://nodejs.org/en

НЕ УСТАНАВЛИВАЙТЕ версию Current, ставьте версию LTS!

Запускаем терминал, переходим в терминале в папку xai-quest-tokens-mint

Выполняем команды:

```
npm install
```

ждём когда установятся все зависимости если появились ошибки, пробуем команду

```
npm install --legacy-peer-deps
```

Далее необходимо добавить приватные ключи в файл keys.txt каждый ключ на новой
строке

## Принцип работы

Скрипт смотрит есть ли баланс в сети Xai, если есть минтит Quest Tokens

## Настройки в файле constants.ts:

`export const MIN_TOKENS_MINT = 6` - сколько минимально токенов минтить
`export const MAX_TOKENS_MINT = 90` - сколько максимально токенов минтить

Выбирается случайное число между MIN_TOKENS_MINT и MAX_TOKENS_MINT

`export const DELAY_FROM_SEC = 100` - минимальное время ожидания в секундах
между кошельками

`export const DELAY_TO_SEC = 200` - максимальное время ожидания в секундах между
кошельками

Запуск

```
npm start
```

## Поблагодарить автора можно отправив донат в любой evm сети на:

```
raznorabochiy.eth
raznorabochiy.arb
raznorabochiy.bnb
0xE8eAbec7CE9e8Bf78A766E8556E542BC2C9446ae
```
