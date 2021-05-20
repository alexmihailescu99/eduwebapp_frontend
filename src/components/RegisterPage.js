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
    const [email, setEmail] = useState("")
    const [occupation, setOccupation] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [role, setRole] = useState("ADMIN")
    const [registerLink, setRegisterLink] = useState(`${backEndUrl}/user/admin`)
    useEffect(() => {
        if (localStorage.getItem("userRole").localeCompare("ADMIN") !== 0) {
            setRole("USER")
            setRegisterLink(`${backEndUrl}/user`)
        }
    }, [])
    const onSubmit = async () => {
        try {
            let headerPayload = (localStorage.getItem("accessToken").localeCompare("null") !== 0 && localStorage.getItem("accessToken") !== undefined) !== 0 ? {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            } : {}
            let data = {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                occupation: occupation,
                phoneNumber: phoneNumber
            }
            let res = (localStorage.getItem("userRole").localeCompare("ADMIN") !== 0) ? await axios.post(registerLink, data) : await axios.post(registerLink, data, headerPayload)
            window.location.href = "/login"
        } catch (err) {
            alert(err)
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

                <div className="form-group">
                    <label>Email</label>
                    <input value={email} onChange={e => {setEmail(e.target.value)}} id="email" type="text" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Occupation</label>
                    <input value={occupation} onChange={e => {setOccupation(e.target.value)}} id="occupation" type="text" className="form-control" placeholder="Enter occupation" />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input value={phoneNumber} onChange={e => {setPhoneNumber(e.target.value)}} id="phoneNumber" type="text" className="form-control" placeholder="Enter phone number" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" style={{background: "#0275d8"}}>Create account</button>
                <p className="forgot-password text-right">
                    Already have an <a href="/login">account</a>?
                </p>
            </form>
        </div>
    )
}