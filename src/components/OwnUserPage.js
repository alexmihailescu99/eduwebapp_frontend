import React, { useState, useEffect } from "react"
import axios from "axios"
import {backEndUrl} from "../App"

export default function OwnUserPage(props) {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [occupation, setOccupation] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [followers, setFollowers] = useState(0)

    useEffect(() => {
        if (localStorage.getItem("accessToken") === "null" || localStorage.getItem("accessToken") === undefined)
            window.location.href = "/login"
        const fetchData = async () => {
            try {
                let headerPayload = localStorage.getItem("accessToken") !== "null" ? {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                } : {}
                let res = await axios.get(`${backEndUrl}/user/${localStorage.getItem("currUser")}`, headerPayload)
                setUsername(res.data.username)
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setRole(res.data.role.replace("ROLE_", ''))
                setEmail(res.data.email)
                setOccupation(res.data.occupation)
                setPhoneNumber(res.data.phoneNumber)
            } catch (err) {
                    if (err.response.status === 401)
                        window.location.href = "/login"
              }
        }
        fetchData()
    }, [])

    
    useEffect(() => {
        const countFollowers = async () => {
            let headerPayload = localStorage.getItem("accessToken") !== "null" ? {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            } : {}
            let res = await axios.get(`${backEndUrl}/user/follower`, headerPayload)
            setFollowers(res.data.length)
        }
        countFollowers()
    }, [])

    const onSubmit = async e => {
        try {
            let headerPayload = (localStorage.getItem("accessToken").localeCompare("null") !== 0 && localStorage.getItem("accessToken") !== undefined) !== 0 ? {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
              } : {}
            let data = {
                username: localStorage.getItem("currUser"),
                firstName: firstName,
                lastName: lastName,
                email: email,
                occupation: occupation,
                phoneNumber: phoneNumber
            }
            let res = await axios.post(`${backEndUrl}/user/update`, data, headerPayload)
            window.location.reload()
        } catch (err) {
            alert("There was something wrong with the update. Please try again")
            window.location.reload()
        }
    }

    return (
        <div className="container emp-profile">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="https://www.bootdey.com/img/Content/avatar/avatar2.png"alt=""/>
                            <div className="file btn btn-lg btn-primary">
                                {username}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                        {`${firstName} ${lastName}`}
                                    </h5>
                                    <h6>
                                        {occupation}
                                    </h6>
                                    <p className="proile-rating">ROLE : <span>{role.toUpperCase()}</span></p>
                                    <p className="proile-rating">Followers : <span>{followers}</span></p>

                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <div className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                            <label>First Name</label>
                                            <input value={firstName} onChange={e => {setFirstName(e.target.value)}} id="username" type="text" className="form-control"/>
                                        </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                            <label>Last Name</label>
                                            <input value={lastName} onChange={e => {setLastName(e.target.value)}} id="lastName" type="text" className="form-control"/>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label>Email</label>
                                            <input value={email} onChange={e => {setEmail(e.target.value)}} id="email" type="text" className="form-control"/>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label>Phone</label>
                                            <input value={phoneNumber} onChange={e => {setPhoneNumber(e.target.value)}} id="phoneNumber" type="text" className="form-control"/>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label>Occupation</label>
                                            <input value={occupation} onChange={e => {setOccupation(e.target.value)}} id="occupation" type="text" className="form-control"/>
                                        </div>
                                        </div>
                            </div>
                            <button type="submit" className="btn btn-dark btn-lg" style={{background: "#0275d8"}}>Update Profile</button>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
    )
}