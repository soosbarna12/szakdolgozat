# import numpy as np
# import pandas as pd
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import LSTM, Dense
# from flask import Flask, request, jsonify
# import pyodbc

# app = Flask(__name__)

# # Database connection configuration
# DB_CONFIG = {
#     'server': 'localhost',
#     'database': 'weather-warehouse',
#     'username': 'sa',
#     'password': 'admin1234',
#     'driver': '{ODBC Driver 17 for SQL Server}'
# }

# def get_historical_data(location_name):
#     """Fetch historical weather data for a location from the database."""
#     conn = None
#     try:
#         conn = pyodbc.connect(
#             f"DRIVER={DB_CONFIG['driver']};"
#             f"SERVER={DB_CONFIG['server']};"
#             f"DATABASE={DB_CONFIG['database']};"
#             f"UID={DB_CONFIG['username']};"
#             f"PWD={DB_CONFIG['password']}"
#         )
#         query = """
#         SELECT TOP 100 Temperature
#         FROM FactWeather f
#         JOIN DimLocation l ON f.LocationKey = l.LocationKey
#         WHERE l.CityName = ?
#         ORDER BY f.DateKey DESC
#         """
#         df = pd.read_sql_query(query, conn, params=[location_name])
#         return df['Temperature'].dropna().tolist()
#     except Exception as e:
#         print(f"Error fetching historical data: {e}")
#         return []
#     finally:
#         if conn:
#             conn.close()

# def prepare_data(data, look_back=7):
#     X, y = [], []
#     for i in range(len(data) - look_back):
#         X.append(data[i:i + look_back])
#         y.append(data[i + look_back])
#     return np.array(X), np.array(y)

# def train_lstm(data):
#     # Normalize data
#     data_range = np.max(data) - np.min(data)
#     if data_range == 0:
#         raise ValueError("Data cannot be normalized because all values are the same.")
#     data = (data - np.min(data)) / data_range

#     # Prepare data
#     look_back = 7
#     X, y = prepare_data(data, look_back)
#     X = X.reshape((X.shape[0], X.shape[1], 1))

#     # Build LSTM model
#     model = Sequential([
#         LSTM(50, activation='relu', input_shape=(look_back, 1)),
#         Dense(1)
#     ])
#     model.compile(optimizer='adam', loss='mse')

#     # Train model
#     model.fit(X, y, epochs=50, batch_size=32, verbose=0)

#     return model, look_back

# if __name__ == "__main__":
#     app.run(port=5001)


# @app.route('/forecast/lstm', methods=['POST'])
# def generate_forecast():
#     try:
#         location_name = request.json.get('location')
#         if not location_name:
#             return jsonify({"error": "No location provided"}), 400

#         print(f"Fetching historical data for location: {location_name}")
#         historical_data = get_historical_data(location_name)
#         if not historical_data or len(historical_data) < 7:
#             print(f"Insufficient historical data for location: {location_name}")
#             return jsonify({"error": "Insufficient historical data for the location"}), 404

#         print(f"Training LSTM model for location: {location_name}")
#         historical_data = np.array(historical_data)
#         model, look_back = train_lstm(historical_data)

#         print(f"Generating forecast for location: {location_name}")
#         last_sequence = historical_data[-look_back:].reshape((1, look_back, 1))
#         forecast = model.predict(last_sequence).flatten().tolist()

#         print(f"Forecast generated: {forecast}")
#         return jsonify({"forecast": forecast})
#     except Exception as e:
#         print(f"Error generating forecast: {e}")
#         return jsonify({"error": str(e)}), 500