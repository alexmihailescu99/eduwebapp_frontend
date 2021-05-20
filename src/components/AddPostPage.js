import React, { useState, useEffect } from "react"
import axios from "axios"
import {backEndUrl} from "../App"

export default function AddPostPage(props) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()

    useEffect(() => {
        const fetchData = async () => {
            let headerPayload = (localStorage.getItem("accessToken").localeCompare("null") !== 0 && localStorage.getItem("accessToken") !== undefined) !== 0 ? {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            } : {}
            let res = await axios.get(`${backEndUrl}/post/categories`, headerPayload);
            setCategories(res.data)
            setSelectedCategory(res.data[0].title)
        }

        let accessToken = localStorage.getItem("accessToken")
        if (!accessToken || accessToken.localeCompare("null") === 0)
            window.location.href = "/login"
        
        fetchData()
    }, [])

    const onSubmit = async e => {
        if (title.localeCompare("") === 0 || content.localeCompare("") === 0) {
            alert("Title and(or) content can not be empty")
            window.location.href = "/addPost"
        }
        try {        
            let headerPayload = (localStorage.getItem("accessToken").localeCompare("null") !== 0 && localStorage.getItem("accessToken") !== undefined) !== 0 ? {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
              } : {}
            let data = {
                title: title,
                content: content,
                category: selectedCategory
            }
            let res = await axios.post(`${backEndUrl}/post`, data, headerPayload)
            window.location.href = "/"
        } catch (err) {
            alert("There was something wrong! Please try again")
            window.location.href = "/"
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

            <div className="form-group">
                <label for="exampleFormControlSelect1">Category</label>
                <select className="form-control" value = {selectedCategory} onChange={e => {setSelectedCategory(e.target.value)}}>
                {
                    categories.map(category => {
                        return (
                            <option key={category.title} value={category.title}>{category.title}</option>
                        )
                    })
                }
                </select>
            </div>


            <button type="submit" className="btn btn-dark btn-lg btn-block" style={{background: "#0275d8"}}>Create Post</button>
        </form>
    </div>
    )
}