# 本地预览（与 GitHub Pages 一样走 HTTP，避免 file:// 下部分资源异常）
# 用法：在资源管理器中右键「使用 PowerShell 运行」，或在终端执行：
#   cd 本目录
#   .\serve.ps1

$ErrorActionPreference = "Stop"
$port = 8080
$root = $PSScriptRoot
Set-Location $root

$url = "http://127.0.0.1:$port/"
Write-Host "站点根目录: $root"
Write-Host "浏览器打开: $url"
Write-Host "按 Ctrl+C 停止服务`n"

try {
    Start-Process $url
} catch {
    # 无图形环境时忽略
}

python -m http.server $port --bind 127.0.0.1
