import React from "react";
import Routes from "./user/Route";
import Footer from "./core/Footer";
const App = () => {
  return (
    <div>
      <div className="main">
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
