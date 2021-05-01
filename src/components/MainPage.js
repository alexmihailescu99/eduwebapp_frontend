import React, { useState, useEffect } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import {backEndUrl, AlertDismissible} from "../App"
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner"
let currUser = localStorage.getItem("currUser")

const InnerSidebarHeader = () => {
  return (
    <div className="inner-sidebar">
            <div className="inner-sidebar-header justify-content-center">
              <Link to="/addPost">
                <button className="btn btn-primary has-icon btn-block" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus mr-2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    NEW DISCUSSION
                </button>
              </Link>
            </div>
    </div>
  )
}

const InnerSidebarBody = () => {
  return (
    <div className="inner-sidebar-body p-0">
                <div className="p-3 h-100" data-simplebar="init">
                    <div className="simplebar-wrapper" style={{margin: -16}}>
                        <div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div>
                        <div className="simplebar-mask">
                            <div className="simplebar-offset" style={{right: 0, bottom: 0}}>
                                <div className="simplebar-content-wrapper" style={{height: "80%", overflow: 'hidden scroll'}}>
                                    <div className="simplebar-content" style={{padding: 16}}>
                                        <nav className="nav nav-pills nav-gap-y-1 flex-column">
                                            <a href="#" className="nav-link nav-link-faded has-icon active">All Threads</a>
                                            <a href="#" className="nav-link nav-link-faded has-icon">Your Custom Feed</a>
  
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="simplebar-placeholder" style={{width: 234, height: 292}}></div>
                    </div>
                    <div className="simplebar-track simplebar-horizontal" style={{visibility: "hidden"}}><div className="simplebar-scrollbar" style={{width: 0, display: "none"}}></div></div>
                    <div className="simplebar-track simplebar-vertical" style={{visibility: "visible"}}><div className="simplebar-scrollbar" style={{height: 151, display: "block", transform: "translate3d(0px, 0px, 0px)"}}></div></div>
                </div>
            </div>
  )
}

const InnerMainHeader = () => {
  return (
    <div className="inner-main-header">
                <a className="nav-link nav-icon rounded-circle nav-link-faded mr-3 d-md-none" href="#" data-toggle="inner-sidebar"><i className="material-icons">arrow_forward_ios</i></a>
                <select className="custom-select custom-select-sm w-auto mr-1">
                    <option selected="">Latest</option>
                    <option value="1">Popular</option>
                    <option value="3">Solved</option>
                    <option value="3">Unsolved</option>
                    <option value="3">No Replies Yet</option>
                </select>
            </div>
  )
}

const InnerMainPost = props => {
    let post = props.postProp

    // Human-friendly Date
    let date = new Date(post.postedAt);
    let hours = date.getHours();
    if (hours < 10) {
        let prevHours = hours;
        hours = "0" + prevHours;
    }
    let minutes = date.getMinutes();
    let day = date.getUTCDate();
    if (minutes < 10) {
        let prevMinutes = minutes;
        minutes = "0" + prevMinutes;
    }
    let month = date.toLocaleString('default', { month: 'long' });

    return (
        <div className="card mb-2" onMouseOver={{background: "#0275d8"}}>
        <div className="card-body p-2 p-sm-3">
            <div className="media forum-item">
                <a href = {`/users/${post.authorUsername}`} data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                <div className="media-body">
                    <h6><a href="#" data-toggle="collapse" data-target=".forum-content" className="text-body">{post.title}</a></h6>
                    <p className="text-secondary">
                        {`${day} ${month}, ${hours}:${minutes}`}
                    </p>
                    <p className="text-muted">Posted by <a href = {`/users/${post.authorUsername}`}>{post.authorUsername}</a></p>
                </div>
                <div className="text-muted small text-center align-self-center">
                    <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> 18 replies</span>
                </div>
            </div>
        </div>
        </div>
    )
}



export default function MainPage(props) {
// Declare a new state variable, which we'll call "count"
    const [posts, setPosts] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                let res = await axios.get(`${backEndUrl}/post`)
                setPosts(res.data)
            } catch (err) {

            }
        }
        currUser = localStorage.getItem("currUser")
        fetchData()
    })
    
    const fetchSearchData = async () => {
        try {
            let res = await axios.get(`${backEndUrl}/search?title=${searchText}`)
            setPosts(res.data)
        } catch (err) {

        }
    }

    return (
        <div>
            <div className="main-body p-0">
            <div className="inner-wrapper">

                <div className="inner-sidebar">
                <InnerSidebarHeader/>
                <InnerSidebarBody/>
                </div>

                <div className="inner-main">
                <InnerMainHeader/>
                
                <div className="inner-main-body p-2 p-sm-3 collapse forum-content show">
                {
                    posts[0] ? 
                    posts.map(post => <InnerMainPost postProp={post}/>)
                    : 
                    <Spinner animation="border" role="status">
                    <span classNameNameName="sr-only">Loading...</span>
                    </Spinner>
                }
                </div>

                </div>

            </div>
            </div>

        </div>
    )
}