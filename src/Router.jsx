import React from "react";

import Hero from "./components/Hero";
import Auth from "./components/Auth";
import Header from "./components/Header";
import App2 from "./App2";


const AppRoutes = [
  {
    path: "/",
    element: <><Header /> <Hero /> </>,
  },
  {
    path: "/signIn",
    element: <Auth />
  },
  {
    path: "/:channelType/:channelId",
    element: <App2/>
  }
];

export default AppRoutes;
