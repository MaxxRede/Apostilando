@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"
title Apostilando - Instalacao no Cloudflare Pages
echo.
echo APOSTILANDO - PUBLICACAO NO CLOUDFLARE PAGES
echo Este instalador baixa a versao atual e publica na sua conta.
echo.
where node >nul 2>nul
if errorlevel 1 goto semnode
where npm >nul 2>nul
if errorlevel 1 goto semnode
node -e "if(Number(process.versions.node.split('.')[0])<22){console.error('Instale Node.js 22 ou superior.');process.exit(1)}"
if errorlevel 1 goto erro
where powershell >nul 2>nul
if errorlevel 1 (
 echo PowerShell nao encontrado. Baixe o repositorio completo e execute este BAT dentro da pasta extraida.
 goto erro
)
echo Baixando a versao atual do GitHub...
set "APOSTILANDO_SETUP_POINTER=%TEMP%\apostilando-path-%RANDOM%-%RANDOM%.txt"
powershell -NoProfile -Command "$ErrorActionPreference='Stop'; [Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; $base=Join-Path $env:LOCALAPPDATA ('Apostilando\downloads\'+[guid]::NewGuid().ToString('N')); New-Item -ItemType Directory -Path $base -Force | Out-Null; $zip=Join-Path $base 'fonte.zip'; Invoke-WebRequest -UseBasicParsing -Headers @{'Cache-Control'='no-cache'} -Uri ('https://github.com/MaxxRede/Apostilando/archive/refs/heads/main.zip?update='+[guid]::NewGuid().ToString('N')) -OutFile $zip; Expand-Archive -LiteralPath $zip -DestinationPath $base; $folder=Get-ChildItem -LiteralPath $base -Directory | Where-Object { Test-Path (Join-Path $_.FullName 'package.json') } | Select-Object -First 1; if(-not $folder){throw 'Pasta do projeto nao encontrada no ZIP'}; [IO.File]::WriteAllText($env:APOSTILANDO_SETUP_POINTER,$folder.FullName,[Text.Encoding]::Default)"
if errorlevel 1 goto erro
set "APOSTILANDO_SOURCE_PATH="
set /p "APOSTILANDO_SOURCE_PATH=" < "%APOSTILANDO_SETUP_POINTER%"
del "%APOSTILANDO_SETUP_POINTER%" >nul 2>nul
if not defined APOSTILANDO_SOURCE_PATH goto erro
cd /d "%APOSTILANDO_SOURCE_PATH%"
if errorlevel 1 goto erro
:preparar
node -p "'Versao que sera publicada: '+require('./package.json').version"
if errorlevel 1 goto erro
echo.
echo [1/3] Instalando dependencias...
call npm ci --no-audit --no-fund
if errorlevel 1 goto erro
echo.
echo [2/3] Preparando os arquivos do sistema...
call npm run build
if errorlevel 1 goto erro
echo.
echo [3/3] Login, criacao do projeto e publicacao...
node scripts\deploy-cloudflare.mjs
if errorlevel 1 goto erro
echo.
echo PRONTO! A URL foi exibida acima pelo Cloudflare.
echo Seus projetos e imagens permanecem no navegador em que voce usa o site.
pause
exit /b 0
:semnode
echo Instale o Node.js LTS 22 ou superior de https://nodejs.org
echo Depois feche esta janela e execute novamente o instalador.
pause
exit /b 1
:erro
echo.
echo A instalacao nao foi concluida. Confira a mensagem de erro acima.
echo Voce pode executar novamente este BAT. Nao e preciso instalar GAS nem planilhas.
pause
exit /b 1
