@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Najprej namesti Node.js: https://nodejs.org
  echo Potem zapri to okno in klikni datoteko se enkrat.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Prvic nameščam knjiznice. To traja minuto...
  call npm install
  if errorlevel 1 (
    echo npm install ni uspel. Preveri internet in Node.js.
    pause
    exit /b 1
  )
)
echo.
echo AERA tece. Brskalnik: http://localhost:8080
echo Okno pusti odprto. Ustavis s Ctrl+C.
echo.
start "" http://localhost:8080
call npm run dev
pause
