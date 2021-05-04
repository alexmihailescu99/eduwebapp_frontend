import React, { useState, useEffect } from "react"
import axios from "axios"
import {backEndUrl} from "../App"

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
        <div className="card mb-2">
        <div className="card-body p-2 p-sm-3">
            <div className="media forum-item">
                <a href = {`/users/${post.authorUsername}`} data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                <div className="media-body">
                    <h6><a href={`/posts/${post.id}`} data-toggle="collapse" data-target=".forum-content" className="text-body">{post.content}</a></h6>
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



export default function AddReplyPage(props) {
    const [mainPost, setMainPost] = useState({})
    const [content, setContent] = useState("")

    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken")
        if (!accessToken || accessToken.localeCompare("null") === 0)
            window.location.href = "/login"
        const fetchData = async () => {
            try {
                let headerPayload = localStorage.getItem("accessToken") !== "null" ? {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                } : {}
                let res = await axios.get(`${backEndUrl}/post/${props.match.params.postId}`, headerPayload);
                setMainPost(res.data)
            } catch (err) {
                alert("Can not get main post")
            }
        }
        fetchData()
    }, [])

    const onSubmit = async e => {
        if (content.localeCompare("") === 0) {
            alert("Content can not be empty")
            window.location.reload()
        }
        try {        
            let headerPayload = (localStorage.getItem("accessToken").localeCompare("null") !== 0 && localStorage.getItem("accessToken") !== undefined) !== 0 ? {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
              } : {}
            let data = {
                content: content
            }
            let res = await axios.post(`${backEndUrl}/post/replies/${mainPost.id}`, data, headerPayload)
        } catch (err) {
            alert("There was something wrong! Please try again")
            window.location.reload()
        }
        window.location.href = `/posts/${mainPost.id}`
    }

    return (
        <div>
        <h3>Original Post </h3>
        <InnerMainPost postProp={mainPost}/>
        <form onSubmit={onSubmit}>

            <h3>Add Reply</h3>
            <div className="form-group">
                <textarea value={content} onChange={e => {setContent(e.target.value)}} id="content" type="text" className="form-control" rows="6" cols="50"/>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block" style={{background: "#0275d8"}}>Add Reply</button>
        </form>
    </div>
    )
}