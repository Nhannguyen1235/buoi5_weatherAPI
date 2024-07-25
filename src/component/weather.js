import React, { useEffect, useState } from "react";
import "./style.css";
import { Input } from "reactstrap";
import axios from "axios";

export default function Weather() {
  const [data, setData] = useState(null);
  const apikey = "5e5d250863b8da511ae1df2104fe5c11";
  const [city, setCity] = useState("Ho Chi Minh");
  const [text, setText] = useState("Ho Chi Minh");
  const [icon, setIcon] = useState("");
  const [sunrise, setSunrise] = useState("1721860835");
  const [sunset, setSunset] = useState("1721906330");
  const urlIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

  const fetchData = () => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        console.log(res);
        setIcon(res.data.weather[0].icon);
        const sunriseDate = new Date(res.data.sys.sunrise * 1000);
        const sunsetDate = new Date(res.data.sys.sunset * 1000);
        setSunrise(sunriseDate.toLocaleTimeString());
        setSunset(sunsetDate.toLocaleTimeString());
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  useEffect(() => {
    fetchData();
  }, [city]);

  return (
    <div>
      weather
      <Input
        className="input mb-4"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setCity(text);
            setText("");
          }
        }}
      />
      {data && (
        <div className="card text-center border">
          <h1>Thành phố: {data.name}</h1>
          <h2>Nhiệt Độ: {data.main.temp}°C</h2>
          <h2>Cảm giác như: {data.main.feels_like}°C</h2>
          <h2>Mô tả: {data.weather[0].description}</h2>
          <h2>Mặt trời mọc lúc: {sunrise}</h2>
          <h2>Mặt trời lặn lúc: {sunset}</h2>
          <img src={urlIcon} />
        </div>
      )}
    </div>
  );
}
