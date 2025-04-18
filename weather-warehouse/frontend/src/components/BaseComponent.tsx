import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useUserDefaultLocationQuery } from "../hooks/useUserDefaultLocationQuery";
import { TodayContext } from "../contexts/TodayContext/TodayContext";
import { ROUTES } from "../consts/routes";
import { TodayPage } from "../pages/TodayPage/TodayPage";


export function BaseComponent() {
  const [coords, setCoords] = useState<GeolocationCoordinates>();
  const { location, setLocation } = useContext(TodayContext);
  const { data } = useUserDefaultLocationQuery(coords?.latitude, coords?.longitude);

  //
  useEffect(() => {
    if (data && coords) {
      setLocation({
        name: data.name,
        country: data.country,
        lat: coords.latitude,
        lon: coords.longitude,
      });
    }

  }, [data]);


  // get user's default location
  useEffect(() => {
    if (navigator.geolocation && !location?.name) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCoords(position.coords);
        }
      )
    }
  }, []);


  function renderRouteElements() {
    return ROUTES.map(({ id, path, element }) => (
      <Route key={id} path={path} element={element} />
    ));
  }

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<TodayPage />} />
          {renderRouteElements()}
          <Route path="*" element={<TodayPage />} />
        </Route>
      </Routes>
    </>
  );
}
