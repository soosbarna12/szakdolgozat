import requests
import gzip
import shutil
import os
import pandas as pd

# config
BASE_URL = "https://bulk.meteostat.net/v2/daily/"
STATION_CSV = "meteostat_stations.csv"
OUTPUT_DIR = "./weather_data/"

# ensure output folder exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# load stations and drop rows with missing WMO IDs
stations_df = pd.read_csv(STATION_CSV)
stations_df = stations_df.dropna(subset=['wmo'])
station_ids = stations_df['wmo'].astype(int).astype(str).tolist()

total_stations = len(station_ids)
print(f"Found {total_stations} valid stations with WMO IDs")

# loop through each station and download daily data
for idx, station_id in enumerate(station_ids, start=1):
    try:
        url = f"{BASE_URL}{station_id}.csv.gz"
        response = requests.get(url, stream=True)

        if response.status_code == 200:
            output_file = os.path.join(OUTPUT_DIR, f"{station_id}.csv")

            with gzip.GzipFile(fileobj=response.raw) as gz:
                with open(output_file, "wb") as out_file:
                    shutil.copyfileobj(gz, out_file)

            print(f"{idx}/{total_stations} - Downloaded {station_id}")
        else:
            print(f"{idx}/{total_stations} - No data for {station_id} (HTTP {response.status_code})")

    except Exception as e:
        print(f"{idx}/{total_stations} - Error with {station_id}: {str(e)}")

print("All station data downloaded.")
