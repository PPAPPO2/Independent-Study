import requests
import os
from django.core.management.base import BaseCommand
from cat.models import TPBL_Season_Players_Performance_24_25
import json

class Command(BaseCommand):
    help = 'Fetch and import player statistics and download images from TPBL API'

    def handle(self, *args, **kwargs):
        # API URL
        url = 'https://api.tpbl.basketball/api/divisions/2/games/players/stats'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}
        
        # Set up directory to save images in 'frontend/public/images/players'
        images_directory = os.path.join('frontend', 'public', 'images', 'players')
        if not os.path.exists(images_directory):
            os.makedirs(images_directory)

        # Fetch the data from API
        response = requests.get(url, headers=headers)
        data = json.loads(response.text)

        # Iterate over player data
        for player_stats in data:
            player = player_stats["player"]
            player_name = player["name"]  # Get player name
            images = player.get("images", [])  # Get image list for the player

            # Check if there are images and download the first image
            if images:
                image_url = images[0]["url"]  # Get the first image URL
                image_extension = image_url.split('.')[-1].split('?')[0]  # Get image extension (e.g., .png)
                image_name = f"{player_name}.{image_extension}"  # Create image file name with player name

                # File path to save the image
                image_path = os.path.join(images_directory, image_name)

                # Download the image
                try:
                    img_data = requests.get(image_url).content
                    with open(image_path, 'wb') as img_file:
                        img_file.write(img_data)
                    self.stdout.write(self.style.SUCCESS(f"Downloaded image for {player_name}"))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Failed to download image for {player_name}: {e}"))

        self.stdout.write(self.style.SUCCESS('Successfully downloaded all player images'))
