# Cleanup unnecessary files
$filesToRemove = @("Home - Shortcut.lnk", "fix-git.bat", "fix-github.bat", "CLAUDE.md")
foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Removed $file"
    }
}

# Git operations
git init
git add .
git commit -m "Clean up and prepare repository for GitHub"
git branch -M main
git remote add origin https://github.com/monildomadiya/bruttonettocalculator.git
git push -u origin main --force

Write-Host "========================================"
Write-Host "Project pushed to GitHub successfully!"
Write-Host "========================================"
