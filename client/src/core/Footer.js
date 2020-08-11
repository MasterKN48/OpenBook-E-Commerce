import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white p-2 container-fluid" id="#footer">
      <div className="container text-center">
        It is sample project, all posted stuff are fake, don't use real payment
        method.
        <br />
        Copyright &copy; {new Date().getFullYear()}{" "}
        <i className="india flag"></i>
      </div>
    </footer>
  );
}
