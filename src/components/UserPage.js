import React, { useState, useEffect } from "react"
import axios from "axios"
import {backEndUrl} from "../App"

export default function UserPage(props) {
    const [id, setId] = useState(-1);
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [occupation, setOccupation] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    
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
                let res = await axios.get(`${backEndUrl}/user/${props.match.params.username}`, headerPayload)
                setId(res.data.id)
                setUsername(res.data.username)
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setRole(res.data.role)
                setEmail(res.data.email)
                setOccupation(res.data.occupation)
                setPhoneNumber(res.data.phoneNumber)
                if (res.data.username.localeCompare(localStorage.getItem("currUser")) === 0)
                    window.location.href = "/myProfile"
                try {
                    res = await axios.get(`${backEndUrl}/user/followed/${id}`, headerPayload)
                    alert(res.data)
                } catch (err) {

                }
            } catch (err) {
                    if (err.response.status === 401)
                        window.location.href = "/login"
              }
        }
        fetchData()
    }, [])

    const addFollowed = () => {

    }

    return (
        <div className="container emp-profile">
            <form method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="https://www.bootdey.com/img/Content/avatar/avatar2.png"alt=""/>
                            <div className="file btn btn-lg btn-primary">
                                {username}
                            </div>
                        </div>
                       <div className = "row">
                            <div className = "col-sm">
                                <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Follow" onClick = {addFollowed} style={{background: "#0275d8", color: "white"}}/>
                            </div>
                            <div className = "col-sm">
                                <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Message" onClick = {addFollowed} style={{background: "#32cd32", color: "white"}}/>
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
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{`${firstName} ${lastName}`}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Occupation</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{occupation}</p>
                                            </div>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
    )
}