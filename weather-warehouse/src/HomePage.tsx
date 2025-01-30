import React from "react";
import { NavBar } from "./components/navbar/NavBar";

export function HomePage() {
  return (
    <div>
      <NavBar/>
      <h1>Welcome to the Weather Warehouse</h1>
      <p>Here you can find all the weather data you need</p>
    </div>
  );
}
