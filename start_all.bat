@echo off
setlocal

echo Starting backend on port 3020...
start "Backend 3020" cmd /k "npm run start:server"

echo Starting frontend on port 3000...
start "Frontend 3000" cmd /k "npm run dev"

echo Waiting briefly for servers to initialize...
timeout /t 3 /nobreak >nul

echo Starting ngrok on port 3000...
start "ngrok 3000" cmd /k "ngrok http 3000"

echo.
echo Quick local checks (timeouts enabled)...
where curl.exe >nul 2>&1
if errorlevel 1 (
  echo curl.exe not found. Skipping local checks.
  echo.
  echo Done. Open http://localhost:3000/ to test.
  exit /b 0
)

curl.exe -I --max-time 2 http://127.0.0.1:3000/ >nul 2>&1
if errorlevel 1 (
  echo Frontend check failed: http://127.0.0.1:3000/
) else (
  echo Frontend OK: http://localhost:3000/
)

curl.exe -i --max-time 2 http://127.0.0.1:3020/api/status >nul 2>&1
if errorlevel 1 (
  echo Backend check failed: http://127.0.0.1:3020/api/status
) else (
  echo Backend OK: http://localhost:3020/api/status
)

curl.exe -i --max-time 2 http://127.0.0.1:4040/api/tunnels >nul 2>&1
if errorlevel 1 (
  echo Ngrok status check skipped/unavailable: http://127.0.0.1:4040/api/tunnels
) else (
  echo Ngrok seems active (local API reachable): http://127.0.0.1:4040/
)

echo.
echo Done. Open http://localhost:3000/ to test.
