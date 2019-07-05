import React from 'react'
//import Dev from '../../img/Dev.png';
export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center" id="#footer">
             Copyright &copy; {new Date().getFullYear()}   <i className="india flag"></i>
        </footer> 
    )
}