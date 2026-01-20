@echo off
echo Ngrok wordt gestart op poort 3000...
echo Kopieer de 'Forwarding' URL (bijv. https://xxxx.ngrok-free.app) naar je .env bestand.
echo.
ngrok http 3000
pause