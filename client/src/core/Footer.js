import React from "react";
import Book from "./Book.png";
export default function Footer() {
  return (
    <footer
      className="bg-dark text-white mt-5 p-4 container-fluid text-center"
      id="#footer"
    >
      <img src={Book} alt="book" style={{ height: "40px", width: "40px" }} />{" "}
      <br />
      OpenBook -- Online World to buy Book <br />
      It is dummy project, don't use real payment method
      <br />
      Copyright &copy; {new Date().getFullYear()} <i className="india flag"></i>
    </footer>
  );
}
