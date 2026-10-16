@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Instale o Node.js LTS de https://nodejs.org e execute novamente.
 pause
 exit /b 1
)
call npm ci
if errorlevel 1 goto erro
call npm run build
if errorlevel 1 goto erro
where py >nul 2>nul
if errorlevel 1 (
 echo Build concluido. Para iniciar localmente, instale Python 3 de https://www.python.org
 pause
 exit /b 0
)
start "" http://localhost:8080
py -m http.server 8080 --directory dist
exit /b 0
:erro
echo Nao foi possivel preparar o Apostilando. Confira a mensagem acima.
pause
exit /b 1
