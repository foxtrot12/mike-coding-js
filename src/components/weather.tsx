import { fetchData } from "@/utilities/utilities";
import { ChangeEvent, memo, useEffect, useState } from "react";

function Weather() {
  const Locations: Location[] = [
    { place: "Delhi", latitude: 28.7041, longitude: 77.1025 },
    { place: "Mumbai", latitude: 19.076, longitude: 72.8777 },
    { place: "Bangalore", latitude: 12.9716, longitude: 77.5946 },
    { place: "Chennai", latitude: 13.0827, longitude: 80.2707 },
    { place: "Kolkata", latitude: 22.5726, longitude: 88.3639 },
    { place: "New York City", latitude: 40.7128, longitude: -74.006 },
    { place: "London", latitude: 51.5074, longitude: -0.1278 },
    { place: "Paris", latitude: 48.8566, longitude: 2.3522 },
    { place: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
    { place: "Sydney", latitude: -33.8688, longitude: 151.2093 },
    { place: "Toronto", latitude: 43.65107, longitude: -79.347015 },
    { place: "Dubai", latitude: 25.2048, longitude: 55.2708 },
    { place: "Singapore", latitude: 1.3521, longitude: 103.8198 },
    { place: "Berlin", latitude: 52.52, longitude: 13.405 },
    { place: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
  ];

  const [location, setLocation] = useState<Location>(Locations[0]);

  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null
  );

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const wData = await fetchData<WeatherApiResponse>(
          "https://api.open-meteo.com/v1/forecast",
          {
            latitude: location.latitude,
            longitude: location.longitude,
            hourly: "temperature_2m,rain",
            timezone: "auto",
          }
        );
        setWeatherData(wData);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    }

    fetchWeatherData();
  }, [location]);

  function changeCity(event: ChangeEvent<HTMLSelectElement>): void {
    const selectedPlace = event.target.value;
    const selectedLocation = Locations.find(
      (loc) => loc.place === selectedPlace
    );
    if (selectedLocation) {
      setLocation(selectedLocation);
    }
  }

  return (
    <main>
      <select onChange={changeCity}>
        {Locations.map((loc) => (
          <option key={loc.place} value={loc.place}>
            {loc.place}
          </option>
        ))}
      </select>

      <div>
        <h1>Weather Data</h1>
        <h2>{location.place}</h2>
        {weatherData?.hourly.time.map((time, index) => (
          <div key={index}>
            <p>{time}</p>
            <p>Temperature: {weatherData.hourly.temperature_2m[index]}°C</p>
            <p>Rain: {weatherData.hourly.rain[index]} mm</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default memo(Weather);

type Location = {
  place: string;
  latitude: number;
  longitude: number;
};

type WeatherApiResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
    rain: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    rain: number[];
  };
};
