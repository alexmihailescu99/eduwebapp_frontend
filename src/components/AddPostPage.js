import React, { useState, useEffect } from "react"
import axios from "axios"
import {backEndUrl} from "../App"
axios.defaults.withCredentials = true

export default function AddPostPage(props) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken")
        if (!accessToken || accessToken.localeCompare("null") === 0)
            window.location.href = "/login"
    })

    const onSubmit = async e => {
        alert(localStorage.getItem("accessToken"))
        e.preventDefault()

        if (title.localeCompare("") === 0 || content.localeCompare("") === 0) {
            alert("Title and(or) content can not be empty")
            window.location.reload()
        }
        try {        
            let headerPayload = localStorage.getItem("accessToken") !== "null" ? {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                params: {
                    title: title,
                    content: content
                }
              } : {}
            let res = await axios.post(`${backEndUrl}/post`, headerPayload)
            alert("You posted successfully")
            window.location.href = "/"
        } catch (err) {
            alert(err.response.status)
        }
    }

    return (
        <div>

        <form onSubmit={onSubmit}>

            <h3>Create Post</h3>

            <div className="form-group">
                <label>Title</label>
                <input value={title} onChange={e => {setTitle(e.target.value)}} id="title" type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label>Content</label>
                <textarea value={undefined} onChange={e => {setContent(e.target.value)}} id="content" type="text" className="form-control" rows="6" cols="50"/>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block" style={{background: "#0275d8"}}>Create Post</button>
        </form>
    </div>
    )
}