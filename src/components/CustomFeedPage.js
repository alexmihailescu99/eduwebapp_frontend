import React, { useState, useEffect } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import {backEndUrl, AlertDismissible} from "../App"
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner"

const InnerSidebarHeader = () => {
  return (
    <div className="inner-sidebar">
            <div className="inner-sidebar-header justify-content-center">
              <Link to="/addPost">
                <button className="btn btn-primary has-icon btn-block" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus mr-2">
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
        <div className="row">
            <a href="/"><span className="col-md-6">Latest</span></a>
            <a href="/myFeed"><span style={{whiteSpace : "nowrap"}} className="col-md-3">My Feed</span></a>
            <a href="/myPosts"><span style={{whiteSpace : "nowrap"}} className="col-md-3">My Posts</span></a>
        </div>
    </div>
  )
}

const addFollowedCategory = async category => {
    try {
        let headerPayload = (localStorage.getItem("accessToken").localeCompare("null") !== 0 && localStorage.getItem("accessToken") !== undefined) !== 0 ? {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
          } : {}
        let res = await axios.post(`${backEndUrl}/post/follow/${category}`, null, headerPayload)
    } catch (err) {
        alert(err)
    }
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
        <div className="card mb-2 show-white-space">
        <div className="card-body p-2 p-sm-3">
            <div className="media forum-item">
                <a href = {`/users/${post.authorUsername}`} data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                <div className="media-body">
                    <h6><a href={`/posts/${post.id}`} data-toggle="collapse" data-target=".forum-content" className="text-body">{post.title}</a></h6>
                    <p className="text-secondary">
                        {`${day} ${month}, ${hours}:${minutes}`}
                    </p>
                    <p className="text-muted">Posted by <a href = {`/users/${post.authorUsername}`}>{post.authorUsername}</a></p>
                    <p className="text-muted">Category : {post.category} <a href = "" onClick={() => {addFollowedCategory(post.category)}}>
                        {props.followed.includes(post.category) ? "(Unfollow Category)" : "(Follow Category)"}
                        </a></p>
                </div>
                <div className="text-muted small text-center align-self-center">
                    <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> {post.noReplies} replies</span>
                </div>
            </div>
        </div>
        </div>
    )
}



export default function CustomFeedPage(props) {
    const [posts, setPosts] = useState([])
    const [followedCategoryTitles, setFollowedCategoryTitles] = useState([])
    // Second argument as [] to stop the infinite loop
    useEffect(() => {
        if ((!localStorage.getItem("accessToken").localeCompare("null")) || localStorage.getItem("accessToken") === undefined)
            window.location.href = "/login"

        const fetchData = async () => {
            try {
                let headerPayload = (localStorage.getItem("accessToken").localeCompare("null") !== 0 && localStorage.getItem("accessToken") !== undefined) !== 0 ? {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                  } : {}
                let res = await axios.get(`${backEndUrl}/post/follow`, headerPayload)
                setPosts(res.data)
            } catch (err) {

            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchFollowedCategories = async () => {
            try {
                let headerPayload = (localStorage.getItem("accessToken").localeCompare("null") !== 0 && localStorage.getItem("accessToken") !== undefined) !== 0 ? {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                  } : {}
                let res = await axios.get(`${backEndUrl}/post/follow/categories`, headerPayload)
                setFollowedCategoryTitles(res.data.map(category => category.title))
            } catch (err) {

            }
        }
        fetchFollowedCategories()
    }, [])

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
                    posts.map(post => <InnerMainPost followed={followedCategoryTitles} postProp={post}/>)
                    : 
                    "There are no posts to show"
                }
                </div>

                </div>

            </div>
            </div>

        </div>
    )
}