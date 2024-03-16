import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import bg1 from "../public/assets/background1.jpg";
import Weather from "@/componets/Weather";
import Spinner from "@/componets/Spinner";
import dynamic from "next/dynamic";

export default function Home(props) {
  const { latitude, longitude } = props;

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
        )
        .then((response) => {
          console.log(response.data);
          setWeather(response.data);
        });
      console.log("This is weather: " + weather.weather[0]);
      setCity("");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        console.log(coords.latitude);
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        console.log(latitude, longitude);
        setLocation({ latitude, longitude });
      });
    }
    console.log(location);
  }, []);

  useEffect(() => {
    async function request() {
      console.log("Before the request");
      if (location.longitude) {
        console.log("After the request");
        try {
          await axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
            )
            .then((response) => {
              console.log(response.data);
              setWeather(response.data);
            });
        } catch (err) {
          console.log(err);
        }
      }
    }
    request();
  }, [location]);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
        {/* Background */}
        <Image src={bg1} layout="fill" className="object-cover" alt="Sky" />
        {/* Search */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
          <form className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl">
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none text-2xl"
                type="text"
                placeholder="Search City"
              />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={25} />
            </button>
          </form>
        </div>
        {/* Weather */}
        {weather.main && <Weather data={weather} />}
      </div>
    );
  }
}
