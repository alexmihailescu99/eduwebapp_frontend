import './App.css';
import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom"
import Alert from "react-bootstrap/Alert"
import NavbarComponent from "./components/NavbarComponent"
import FooterComponent from "./components/FooterComponent"
import MainPage from "./components/MainPage"
import RegisterPage from "./components/RegisterPage"
import LoginPage from "./components/LoginPage"
import PostPage from "./components/PostPage"
import AddPostPage from "./components/AddPostPage"
import AddReplyPage from "./components/AddReplyPage"
import UserPage from "./components/UserPage"
import OwnUserPage from './components/OwnUserPage';
import axios from 'axios';
export const backEndUrl = "http://localhost:8080/api"
// Not Logged in Alert
export const AlertDismissible = () => {
    const [show, setShow] = useState(true);
    if (show && (localStorage.getItem("currUser") === "null" || localStorage.getItem("currUser") === undefined)) {
        return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>You are not logged in</Alert.Heading>
            <p>
            Please <a href ="/login">login</a> or <a href ="/register">register</a> to access the full features of our forum
            </p>
        </Alert>
        )
    }
    return null
}

function App() {
    let headerPayload = localStorage.getItem("accessToken") !== "null" ? {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    } : {}
    

    return (
        <Router>
          <AlertDismissible/>
          <NavbarComponent/>
          <div className="container">
            <Route exact path = "/" render = {props => (<MainPage {...props} header = {headerPayload} />)}/>
            <Route exact path = "/register" render = {props => (<RegisterPage {...props} header = {headerPayload} />)} />
            <Route exact path = "/login" render = {props => (<LoginPage {...props} header = {headerPayload} />)} />
            <Route exact path = "/users/:username" render = {props => (<UserPage {...props} header = {headerPayload} />)} />
            <Route exact path = "/myProfile" render = {props => (<OwnUserPage {...props} header = {headerPayload} />)} />
            <Route exact path = "/posts/:postId" render = {props => (<PostPage {...props} header = {headerPayload} />)}/>
            <Route exact path = "/addPost" render = {props => (<AddPostPage {...props} header = {headerPayload} />)}/>
            <Route exact path = "/addReply/:postId" render = {props => (<AddReplyPage {...props} header = {headerPayload} />)}/>
          </div>
          <FooterComponent/>
        </Router>
    );
}

export default App;
