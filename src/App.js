import './App.css';
import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"
import Alert from "react-bootstrap/Alert"
import NavbarComponent from "./components/NavbarComponent"
import FooterComponent from "./components/FooterComponent"
import MainPage from "./components/MainPage"
import CustomFeedPage from "./components/CustomFeedPage"
import UserPostsPage from "./components/UserPostsPage"
import RegisterPage from "./components/RegisterPage"
import LoginPage from "./components/LoginPage"
import PostPage from "./components/PostPage"
import AddPostPage from "./components/AddPostPage"
import AddReplyPage from "./components/AddReplyPage"
import UserPage from "./components/UserPage"
import OwnUserPage from './components/OwnUserPage';
import ChatPage from "./components/ChatPage"
import NotFoundPage from "./components/NotFoundPage"
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
  useEffect(() => {
    const fetchData = async () => {
      let headerPayload = localStorage.getItem("accessToken") !== "null" ? {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      } : {}
      try {
        let res = await axios.get(`${backEndUrl}/user`, headerPayload)
        localStorage.setItem("currUser", res.data.username)
        localStorage.setItem("userRole", res.data.role.replace("ROLE_", ''))
      } catch (err) {
        if (err.response.status === 401 || err.response.status === 500) {
          localStorage.setItem("accessToken", "null")
          localStorage.setItem("currUser", "null")
        }
      }
    }
    fetchData()
  }, [])
    
    return (
        <Router>
          <AlertDismissible/>
          <NavbarComponent/>
          <div className="container">
          <Switch>
            <Route exact path = "/" render = {props => (<MainPage {...props}/>)}/>
            <Route exact path = "/myFeed" render = {props => (<CustomFeedPage {...props}/>)}/>
            <Route exact path = "/myPosts" render = {props => (<UserPostsPage {...props}/>)}/>
            <Route exact path = "/register" render = {props => (<RegisterPage {...props}/>)} />
            <Route exact path = "/login" render = {props => (<LoginPage {...props}/>)} />
            <Route exact path = "/users/:username" render = {props => (<UserPage {...props}/>)} />
            <Route exact path = "/myProfile" render = {props => (<OwnUserPage {...props}/>)} />
            <Route exact path = "/myMessages" render = {props => (<ChatPage {...props}/>)}/>
            <Route exact path = "/posts/:postId" render = {props => (<PostPage {...props}/>)}/>
            <Route exact path = "/addPost" render = {props => (<AddPostPage {...props}/>)}/>
            <Route exact path = "/addReply/:postId" render = {props => (<AddReplyPage {...props}/>)}/>
            <Route component={NotFoundPage}/>
          </Switch>
          </div>
          <FooterComponent/>
        </Router>
    );
}

export default App;
