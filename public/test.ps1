Add-Type -AssemblyName System.Drawing
$files = @('outcame1.png', 'outcame2.png', 'outcame3.png', 'outcame4.png')
foreach ($file in $files) {
    $img = [System.Drawing.Image]::FromFile("c:\Users\green\OneDrive\Documents\Cevrynt Website\cevrynt-website\public\media\placeholder\$file")
    Write-Output "$file"
    Write-Output $img.Width
    Write-Output $img.Height
    $img.Dispose()
}
