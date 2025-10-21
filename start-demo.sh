#!/bin/bash

echo "========================================"
echo "  AeroMind - Starting Local Server"
echo "  正在启动本地服务器"
echo "========================================"
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "[INFO] Using Python HTTP Server"
    echo "[INFO] 使用Python HTTP服务器"
    echo ""
    echo "[INFO] Opening browser at: http://localhost:8000/visualization/standalone.html"
    echo "[INFO] 正在浏览器中打开: http://localhost:8000/visualization/standalone.html"
    echo ""
    echo "[INFO] Press Ctrl+C to stop the server"
    echo "[INFO] 按 Ctrl+C 停止服务器"
    echo ""

    # Open browser (works on macOS and most Linux)
    sleep 2
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open http://localhost:8000/visualization/standalone.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open http://localhost:8000/visualization/standalone.html 2>/dev/null
    fi

    # Start Python server
    python3 -m http.server 8000
    exit 0
fi

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "[INFO] Using Node.js HTTP Server"
    echo "[INFO] 使用Node.js HTTP服务器"
    echo ""
    echo "[INFO] Opening browser at: http://localhost:8000/visualization/standalone.html"
    echo "[INFO] 正在浏览器中打开: http://localhost:8000/visualization/standalone.html"
    echo ""
    echo "[INFO] Press Ctrl+C to stop the server"
    echo "[INFO] 按 Ctrl+C 停止服务器"
    echo ""

    # Open browser
    sleep 2
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open http://localhost:8000/visualization/standalone.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open http://localhost:8000/visualization/standalone.html 2>/dev/null
    fi

    # Start Node.js server
    npx http-server -p 8000
    exit 0
fi

# If neither Python nor Node.js is found
echo "[ERROR] Neither Python nor Node.js is installed!"
echo "[ERROR] 未安装Python或Node.js！"
echo ""
echo "Please install one of the following:"
echo "请安装以下工具之一："
echo "  - Python 3: https://www.python.org/downloads/"
echo "  - Node.js: https://nodejs.org/"
echo ""
exit 1
