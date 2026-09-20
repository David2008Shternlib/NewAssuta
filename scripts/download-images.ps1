# Downloads images from the old site into public/images
# Run:
#   powershell -ExecutionPolicy Bypass -File C:\Projects\newAssuta\scripts\download-images.ps1
#
# ASCII only on purpose: Windows PowerShell reads .ps1 in the system codepage,
# so any non-ASCII character here would break the parser.

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$dest = "C:\Projects\newAssuta\public\images"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$urls = @(
  "https://assuta.org/wp-content/themes/assutaisrael/assets/images/assuta-logo.png",
  "https://assuta.org/wp-content/uploads/2023/08/slider_bg.webp",
  "https://assuta.org/wp-content/uploads/2023/08/we_offer-1.webp",
  "https://assuta.org/wp-content/uploads/2023/08/we_offer2-1.webp",
  "https://assuta.org/wp-content/uploads/2023/08/we_offer3.webp",
  "https://assuta.org/wp-content/uploads/2023/08/img1.png"
)

$names = @(
  "assuta-logo.png",
  "hero-bg.webp",
  "offer-1.webp",
  "offer-2.webp",
  "offer-3.webp",
  "about.png"
)

$ok = 0
$failed = @()

for ($i = 0; $i -lt $urls.Length; $i++) {
  $url = $urls[$i]
  $name = $names[$i]
  $out = Join-Path $dest $name

  try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 30
    $kb = [math]::Round((Get-Item $out).Length / 1KB, 1)
    Write-Host "OK    $name  ($kb KB)" -ForegroundColor Green
    $ok = $ok + 1
  }
  catch {
    Write-Host "FAIL  $name" -ForegroundColor Red
    Write-Host "      $url" -ForegroundColor DarkGray
    $failed += $name
  }
}

Write-Host ""
Write-Host "Downloaded: $ok of $($urls.Length)"
Write-Host "Folder:     $dest"

if ($failed.Length -gt 0) {
  Write-Host ""
  Write-Host "Not downloaded:" -ForegroundColor Yellow
  foreach ($f in $failed) { Write-Host "  $f" -ForegroundColor Yellow }
  Write-Host "Open the URL above in a browser and save the file manually under that name."
}

Write-Host ""
Write-Host "Files in folder:"
Get-ChildItem $dest | Format-Table Name, Length -AutoSize
