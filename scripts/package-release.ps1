$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$artifactsDir = Join-Path $root "artifacts"
$zipPath = Join-Path $artifactsDir "py-type-release.zip"

if (-not (Test-Path $artifactsDir)) {
    New-Item -ItemType Directory -Path $artifactsDir | Out-Null
}

if (Test-Path $zipPath) {
    Remove-Item -LiteralPath $zipPath -Force
}

$includePaths = @(
    "apps",
    "packages",
    "templates",
    "scripts",
    "docs",
    ".github",
    ".env.example",
    ".gitignore",
    "package.json",
    "pnpm-workspace.yaml",
    "README.md",
    "turbo.json"
)

$stagingDir = Join-Path $artifactsDir "py-type-release"

if (Test-Path $stagingDir) {
    Remove-Item -LiteralPath $stagingDir -Recurse -Force
}

New-Item -ItemType Directory -Path $stagingDir | Out-Null

foreach ($relativePath in $includePaths) {
    $sourcePath = Join-Path $root $relativePath
    if (-not (Test-Path $sourcePath)) {
        continue
    }

    $destinationPath = Join-Path $stagingDir $relativePath
    $destinationParent = Split-Path -Parent $destinationPath
    if (-not (Test-Path $destinationParent)) {
        New-Item -ItemType Directory -Path $destinationParent -Force | Out-Null
    }

    if ((Get-Item $sourcePath) -is [System.IO.DirectoryInfo]) {
        Copy-Item -LiteralPath $sourcePath -Destination $destinationPath -Recurse -Force
    }
    else {
        Copy-Item -LiteralPath $sourcePath -Destination $destinationPath -Force
    }
}

Compress-Archive -Path (Join-Path $stagingDir "*") -DestinationPath $zipPath -Force

Write-Host "Created release package:"
Write-Host $zipPath
