import React from "react";
import Menu from "./Menu";
import Book from './Book.png';
const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children,
    logo=false
}) => (
    <div>
        <Menu />
        <div className="jumbotron cloudy-knoxville-gradient">
            <h2>{title}</h2>
            {logo ? <img src={Book} alt="OpenBook" style={{height:'45px',width:'45px'}}/> : null}
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
