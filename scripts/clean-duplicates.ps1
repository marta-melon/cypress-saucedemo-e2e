\
$ErrorActionPreference = 'Stop'
$refFiles = Get-ChildItem -Path 'cypress/e2e' -Filter 'ref-*.cy.js' -File -ErrorAction SilentlyContinue
if ($refFiles) {
  $refFiles | ForEach-Object {
    Write-Host "Removing $($_.FullName)"
    Remove-Item -Force $_.FullName
  }
} else {
  Write-Host "No ref-* spec files found."
}
