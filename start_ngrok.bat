@echo off
echo Starting ngrok on port 3000...
echo Copy the "Forwarding" URL (for example: https://xxxx.ngrok-free.app) into your .env as REDIRECT_URI (must end with /callback).
echo.
ngrok http 3000
pause
