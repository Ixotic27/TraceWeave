$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundledPython = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
if (Test-Path -LiteralPath $bundledPython) {
    $taskPython = $bundledPython
} elseif ($pythonCommand) {
    $taskPython = $pythonCommand.Source
} else {
    throw 'Python 3.11 or later is required. No additional packages are needed.'
}
Push-Location -LiteralPath $taskRoot
try {
    & $taskPython -m traceweave.server --watch-docs
} finally {
    Pop-Location
}
