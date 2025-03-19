import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAlert } from "../../utils/AlertContext";

export function useHistoricalData() {
  const { showAlert } = useAlert();

  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  // Dummy table data
  const [tableData, setTableData] = useState([
    { date: "2023-08-01", maxTemp: 32, minTemp: 25, humidity: 60 },
    { date: "2023-07-31", maxTemp: 34, minTemp: 23, humidity: 70 },
  ]);

  // Handle location change
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };

  // Handle date change
  const handleDateChange = (dateValue: dayjs.Dayjs | null) => {
    setSelectedDate(dateValue);
  };

  // Fetch weather data for the selected location
  const { data, error } = useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      const response = await axios.get(`/today/data?location=${location}&lang=en`);
      if (response.data?.cod === "404") {
        throw new Error("City not found");
      }
      return response.data;
    },
    enabled: !!location,
  });

  // Show alert if there is an error fetching data
  useEffect(() => {
    if (error) {
      showAlert("Error fetching data", "error");
    }
  }, [error, showAlert]);

  // Update table data when new data is fetched
  useEffect(() => {
    if (data?.main?.temp_max && data?.main?.temp_min) {
      const currentDate = new Date().toISOString().split("T")[0];
      setTableData((prev) => [
        ...prev,
        {
          date: currentDate,
          maxTemp: Math.round(data.main.temp_max - 273.15),
          minTemp: Math.round(data.main.temp_min - 273.15),
          humidity: data.main.humidity,
        },
      ]);
    }
  }, [data]);

  // Add new record to the table when a new date is selected
  useEffect(() => {
    if (selectedDate) {
      const newRecord = {
        date: selectedDate.format("YYYY-MM-DD"),
        maxTemp: 28,
        minTemp: 18,
        humidity: 55,
      };
      setTableData((prev) => [...prev, newRecord]);
    }
  }, [selectedDate]);

  return {
    location,
    setLocation,
    selectedDate,
    handleLocationChange,
    handleDateChange,
    data,
    tableData,
  };
}