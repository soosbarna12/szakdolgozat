import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useUserDefaultLocationQuery } from "../hooks/useUserDefaultLocationQuery";
import { LocationContext } from "../contexts/LocationContext";
import { ROUTES } from "../consts/routes";
import { TodayPage } from "../pages/TodayPage/TodayPage";


export function BaseComponent() {
  const [coords, setCoords] = useState<GeolocationCoordinates>();
  const { setLocation } = useContext(LocationContext);
  const { data: userDefaultLocationName } = useUserDefaultLocationQuery(coords?.latitude, coords?.longitude);

  //
  useEffect(() => {
    if (userDefaultLocationName && coords) {
      setLocation({
        name: userDefaultLocationName,
        lat: coords.latitude,
        lon: coords.longitude,
      });
    }

  }, [userDefaultLocationName]);


  // get user's default location
  useEffect(() => {
    if (navigator.geolocation) {
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
