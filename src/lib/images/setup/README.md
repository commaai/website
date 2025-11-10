# Convert PNG images to JPG at 50% scale and quality 80
cd src/lib/images/setup/comma-four && mkdir -p out && for file in *.png; do convert "$file" -resize 50% -quality 80 "out/${file%.png}.jpg"; done
