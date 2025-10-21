@echo off
chcp 65001 >nul
echo ========================================
echo   AeroMind - Starting Local Server
echo   正在启动本地服务器
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Using Python HTTP Server
    echo [INFO] 使用Python HTTP服务器
    echo.
    echo [INFO] Opening browser at: http://localhost:8000/visualization/standalone.html
    echo [INFO] 正在浏览器中打开: http://localhost:8000/visualization/standalone.html
    echo.
    echo [INFO] Press Ctrl+C to stop the server
    echo [INFO] 按 Ctrl+C 停止服务器
    echo.

    REM Open browser after a short delay
    timeout /t 2 /nobreak >nul
    start http://localhost:8000/visualization/standalone.html

    REM Start Python server
    python -m http.server 8000
    goto :end
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Using Node.js HTTP Server
    echo [INFO] 使用Node.js HTTP服务器
    echo.
    echo [INFO] Opening browser at: http://localhost:8000/visualization/standalone.html
    echo [INFO] 正在浏览器中打开: http://localhost:8000/visualization/standalone.html
    echo.
    echo [INFO] Press Ctrl+C to stop the server
    echo [INFO] 按 Ctrl+C 停止服务器
    echo.

    REM Open browser after a short delay
    timeout /t 2 /nobreak >nul
    start http://localhost:8000/visualization/standalone.html

    REM Start Node.js server
    npx http-server -p 8000
    goto :end
)

REM If neither Python nor Node.js is found
echo [ERROR] Neither Python nor Node.js is installed!
echo [ERROR] 未安装Python或Node.js！
echo.
echo Please install one of the following:
echo 请安装以下工具之一：
echo   - Python 3: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo.
pause
goto :end

:end
