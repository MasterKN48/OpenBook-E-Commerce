import React from "react";
import Routes from "./user/Route";
import Footer from "./core/Footer";
const App = () => {
  return (
    <div id="dd">
      <Routes />
      <div style={{ marginTop: "10vh", marginBottom: "8vh" }}></div>
      <Footer />
    </div>
  );
};

export default App;
