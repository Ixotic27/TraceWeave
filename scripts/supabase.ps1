# Use Windows-trusted public certificates when available; never disable TLS.
$TraceWeaveRoot = Split-Path -Parent $PSScriptRoot
$TraceWeaveCli = Join-Path $TraceWeaveRoot '.tools/supabase/supabase.exe'
$TraceWeaveCa = Join-Path $TraceWeaveRoot '.tools/windows-trusted-ca.pem'
if (-not (Test-Path -LiteralPath $TraceWeaveCli)) { throw 'Run python scripts/install_supabase_cli.py first.' }
$TraceWeavePreviousCa = $env:NODE_EXTRA_CA_CERTS
try {
    if (Test-Path -LiteralPath $TraceWeaveCa) { $env:NODE_EXTRA_CA_CERTS = $TraceWeaveCa }
    & $TraceWeaveCli @args
    $TraceWeaveExit = $LASTEXITCODE
} finally { $env:NODE_EXTRA_CA_CERTS = $TraceWeavePreviousCa }
exit $TraceWeaveExit
