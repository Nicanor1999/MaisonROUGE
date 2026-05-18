@echo off
setlocal enabledelayedexpansion

:: ============================================================
:: auto_push.bat — Push automatique avec commits conventionnels
:: ============================================================

set PROJECT_DIR=C:\Users\estel\Desktop\MaisonROUGE
set LOG_FILE=%USERPROFILE%\auto_push.log

echo [%date% %time%] --- Debut du push automatique --- >> "%LOG_FILE%"

:: Aller dans le projet
cd /d "%PROJECT_DIR%"
if errorlevel 1 (
    echo [%date% %time%] ERREUR : dossier introuvable >> "%LOG_FILE%"
    exit /b 1
)

:: Vérifier s'il y a des changements
git diff --quiet 2>nul
git diff --cached --quiet 2>nul
for /f %%i in ('git status --porcelain') do set HAS_CHANGES=1

if not defined HAS_CHANGES (
    echo [%date% %time%] Aucun changement. Push ignore. >> "%LOG_FILE%"
    exit /b 0
)

:: Analyser les fichiers modifiés pour choisir le bon type de commit
set COMMIT_TYPE=chore
set COMMIT_SCOPE=project
set COMMIT_SUBJECT=update files

:: Compter les types de fichiers modifiés
for /f %%f in ('git diff --name-only HEAD 2^>nul') do (
    set FILENAME=%%f

    :: Détection du type selon l'extension ou le nom du fichier
    echo %%f | findstr /i "\.html \.css \.scss" >nul && set COMMIT_TYPE=style& set COMMIT_SCOPE=ui
    echo %%f | findstr /i "\.js \.ts \.jsx \.tsx \.py \.php" >nul && set COMMIT_TYPE=feat& set COMMIT_SCOPE=code
    echo %%f | findstr /i "README \.md \.txt" >nul && set COMMIT_TYPE=docs& set COMMIT_SCOPE=readme
    echo %%f | findstr /i "test spec" >nul && set COMMIT_TYPE=test& set COMMIT_SCOPE=tests
    echo %%f | findstr /i "package\.json \.env config" >nul && set COMMIT_TYPE=build& set COMMIT_SCOPE=config
    echo %%f | findstr /i "\.png \.jpg \.jpeg \.gif \.svg \.ico" >nul && set COMMIT_TYPE=feat& set COMMIT_SCOPE=assets
)

:: Construire le sujet avec la date
set COMMIT_MSG=%COMMIT_TYPE%(%COMMIT_SCOPE%): auto-save %date%

:: Ajouter tous les fichiers
git add -A
echo [%date% %time%] Fichiers ajoutes. >> "%LOG_FILE%"

:: Commit avec le message conventionnel
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo [%date% %time%] ERREUR : commit echoue. >> "%LOG_FILE%"
    exit /b 1
)
echo [%date% %time%] Commit : %COMMIT_MSG% >> "%LOG_FILE%"

:: Push
for /f %%b in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%b
git push origin %BRANCH%
if errorlevel 1 (
    echo [%date% %time%] ERREUR : push echoue. >> "%LOG_FILE%"
    exit /b 1
)

echo [%date% %time%] Push reussi sur origin/%BRANCH% >> "%LOG_FILE%"
echo [%date% %time%] --- Fin --- >> "%LOG_FILE%"
