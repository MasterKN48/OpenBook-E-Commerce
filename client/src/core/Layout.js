import React from "react";
import Menu from "./Menu";
import Book from "../assets/Book.png";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
  logo = false,
}) => (
  <div>
    <Menu />
    <div className="jumbotron cloudy-knoxville-gradient">
      {logo ? (
        <div>
          <h2>
            <img src={Book} alt="OpenBook" style={{ height: "48px" }} /> {title}
          </h2>
        </div>
      ) : (
        <h2>{title}</h2>
      )}
      <p className="lead mb-2">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
