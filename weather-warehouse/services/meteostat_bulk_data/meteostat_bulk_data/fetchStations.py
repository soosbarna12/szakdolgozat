from meteostat import Stations
import pandas as pd

stations = Stations().fetch()

print(stations.head())

stations.to_csv("meteostat_stations.csv", index=False)