import React, { useState, useEffect } from "react"
import axios from "axios"
import {backEndUrl} from "../App"

export default function LoginPage(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const onSubmit = async e => {
        e.preventDefault();
        try {
            let res = await axios.post(`${backEndUrl}/login`, JSON.stringify({
                username: username,
                password: password
            }))
            localStorage.setItem("accessToken", res.data.token)
            localStorage.setItem("currUser", username)
            window.location.href = "/"
        } catch (err) {
            if (err.response.status === 401)
                alert("Wrong username or password")
                window.location.reload()
        }
    }

    return (
        <div>

            <form onSubmit={onSubmit}>

                <h3>Login</h3>

                <div className="form-group">
                    <label>User</label>
                    <input value={username} onChange={e => {setUsername(e.target.value)}} id="username" type="text" className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input value={password} onChange={e => {setPassword(e.target.value)}} id="password" type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" style={{background: "#0275d8"}}>Login</button>
                <p className="forgot-password text-right">
                    Don't have an <a href="/register">account</a>?
                </p>
            </form>
        </div>
    )
}