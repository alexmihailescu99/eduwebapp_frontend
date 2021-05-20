import React, { useState, useEffect } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import {backEndUrl, AlertDismissible} from "../App"
import Spinner from "react-bootstrap/Spinner"

const InnerSidebarHeader = props => {
    return (
      <div className="inner-sidebar">
              <div className="inner-sidebar-header justify-content-center">
                <Link to={`/addReply/${props.postId}`}>
                  <button className="btn btn-primary has-icon btn-block" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus mr-2">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      NEW REPLY
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
          <div className="card mb-2 show-white-space">
          <div className="card-body p-2 p-sm-3">
              <div className="media forum-item">
                  <a href = {`/users/${post.authorUsername}`} data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                  <div className="media-body">
                    <p>{post.content}</p>
                      <p className="text-secondary">
                          {`${day} ${month}, ${hours}:${minutes}`}
                      </p>
                      <p className="text-muted">Posted by <a href = {`/users/${post.authorUsername}`}>{post.authorUsername}</a></p>
                  </div>
              </div>
          </div>
          </div>
      )
  }

  const InnerMainReply = props => {
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

    const deleteReply = async replyId => {
        try {
            let headerPayload = (localStorage.getItem("accessToken").localeCompare("null") !== 0 && localStorage.getItem("accessToken") !== undefined) !== 0 ? {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
              } : {}
            let res = await axios.delete(`${backEndUrl}/post/replies/${replyId}`, headerPayload)
            window.location.reload()
        } catch (err) {
            alert(err)
            window.location.reload()
        }
    }

    return (
        <div className="card mb-2 show-white-space">
        <div className="card-body p-2 p-sm-3">
            <div className="media forum-item">
                <a href = {`/users/${post.author.username}`} data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                <div className="media-body">
                    <p>{post.content}</p>
                    <p className="text-secondary">
                        {`${day} ${month}, ${hours}:${minutes}`}
                    </p>
                    <p className="text-muted">
                        Replied by <a href = {`/users/${post.author.username}`}>{post.author.username}</a>
                        {
                        !localStorage.getItem("currUser").localeCompare(post.author.username) || !localStorage.getItem("userRole").localeCompare("ADMIN")
                            || !localStorage.getItem("userRole").localeCompare("MODERATOR") ?
                            <a href="#" onClick={() => deleteReply(props.replyId)}className="float-right">Delete</a>
                        : ""
                    }
                        </p>
                    
                </div>
            </div>
        </div>
        </div>
    )
}

export default function PostPage(props) {
    const [mainPost, setMainPost] = useState({})
    const [replies, setReplies] = useState([])

    useEffect(() => {
        if (localStorage.getItem("accessToken") === undefined || !localStorage.getItem("accessToken").localeCompare("null")) {
            window.location.href = "/login"
        }
        const fetchData = async () => {
            try {
                let headerPayload = localStorage.getItem("accessToken") !== "null" ? {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                } : {}
                let res = await axios.get(`${backEndUrl}/post/${props.match.params.postId}`, headerPayload);
                setMainPost(res.data)
                try {
                    let res = await axios.get(`${backEndUrl}/post/replies/${props.match.params.postId}`, headerPayload);
                    setReplies(res.data)
                } catch (err) {
                    
                }
            } catch (err) {
                alert("Can not get main post")
            }
        }
        fetchData()
    }, [])
    return (
        <div>
            <div className="main-body p-0">
            <div className="inner-wrapper">

                <div className="inner-sidebar">
                <InnerSidebarHeader postId={props.match.params.postId}/>
                <InnerSidebarBody/>
                </div>

                <div className="inner-main">
                <InnerMainHeader/>
                
                <div className="inner-main-body p-2 p-sm-3 collapse forum-content show">
                <InnerMainPost postProp={mainPost}/>
                {
                    replies[0] ? 
                    replies.map(reply => <InnerMainReply replyId = {reply.id} postProp={reply}/>)
                    : 
                    "There are no replies here yet"
                }
                </div>

                </div>

            </div>
            </div>

        </div>
    )
}