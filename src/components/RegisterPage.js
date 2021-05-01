import React, { useState, useEffect } from "react"
import axios from "axios"
import {backEndUrl} from "../App"

const FormGroup = props => {
    return (
        <div></div>
    )
}
export default function RegisterPage(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const onSubmit = async () => {
        try {
            let res = await axios.post(`${backEndUrl}/user`, {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName
            })
            window.location.href = "/login"
        } catch (err) {
            alert("Error")
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>

                <h3>Register</h3>

                <div className="form-group">
                    <label>User</label>
                    <input value={username} onChange={e => {setUsername(e.target.value)}} id="username" type="text" className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input value={password} onChange={e => {setPassword(e.target.value)}} id="password" type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>First Name</label>
                    <input value={firstName} onChange={e => {setFirstName(e.target.value)}} id="firstName" type="text" className="form-control" placeholder="Enter first name" />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input value={lastName} onChange={e => {setLastName(e.target.value)}} id="lastName" type="text" className="form-control" placeholder="Enter first name" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" style={{background: "#0275d8"}}>Create account</button>
                <p className="forgot-password text-right">
                    Already have an <a href="/login">account</a>?
                </p>
            </form>
        </div>
    )
}