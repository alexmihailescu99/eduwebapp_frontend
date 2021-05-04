import React, { useState, useEffect } from "react"
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import axios from "axios"
import {backEndUrl} from "../App"
import logo from "../static/img/logo.png";

export default function NavbarComponent(props) {
    const logOut = () => {
        localStorage.setItem("currUser", "null");
        localStorage.setItem("accessToken", "null");
        window.location.href = "/";
    }
    return (localStorage.getItem("accessToken") === undefined || !localStorage.getItem("accessToken").localeCompare("null")) ?
        (
            <Navbar bg="light" expand="lg">
                <div className="container">
                    <a class="navbar-brand" href="">
                        <img src={logo} width="45" height="45" onMouseOver={e => {e.currentTarget.style.opacity="0.7"}} onMouseOut={e => {e.currentTarget.style.opacity="1"}} alt=""/>
                    </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Nav.Link href="/login">Log in</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            </Navbar.Collapse>
                </div>
            </Navbar>
        ) :
        (
            (
                <Navbar bg="light" expand="lg">
                    <div className ="container">
                 <a class="navbar-brand" href="">
                 <img src={logo} width="45" height="45" onMouseOver={e => {e.currentTarget.style.opacity="0.7"}} onMouseOut={e => {e.currentTarget.style.opacity="1"}} alt=""/>
                </a>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                    <NavDropdown title={localStorage.getItem("currUser")} id="basic-nav-dropdown">
                            <NavDropdown.Item href={"/myProfile"} >Your Profile</NavDropdown.Item>
                            <NavDropdown.Item href={"/myMessages"} >Your Messages</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                        </NavDropdown>

                </Navbar.Collapse>
                </div>
            </Navbar>
            )
        )
}