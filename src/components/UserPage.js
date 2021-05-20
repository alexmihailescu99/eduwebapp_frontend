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
    // Really inefficient, but can't get it to work otherwise
    const [followedUsernames, setFollowedUsernames] = useState([])
    const [followers, setFollowers] = useState(-1)

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
                setRole(res.data.role.replace("ROLE_", ''))
                setEmail(res.data.email)
                setOccupation(res.data.occupation)
                setPhoneNumber(res.data.phoneNumber)
                if (res.data.username.localeCompare(localStorage.getItem("currUser")) === 0)
                    window.location.href = "/myProfile"
            } catch (err) {
                    if (err.response.status === 401)
                        window.location.href = "/login"
                    if (err.response.status === 404) {
                        alert("No such user exists")
                        window.location.href = "/"
                    }
              }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const checkIfFollowed = async () => {
            try {
                let headerPayload = localStorage.getItem("accessToken") !== "null" ? {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                } : {}
                let res = await axios.get(`${backEndUrl}/user/followed`, headerPayload)
                setFollowedUsernames(res.data.map(user => user.username))
            } catch (err) {
    
            }
        }
        checkIfFollowed()
    }, [])


    const addFollowed = async () => {
        try {
            let headerPayload = localStorage.getItem("accessToken") !== "null" ? {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            } : {}
            let res = await axios.post(`${backEndUrl}/user/follow/${id}`, null, headerPayload)
            window.location.reload()
        } catch (err) {
            alert(err)
        }
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
                                {!followedUsernames.includes(username) ?
                                    <input type="button" className="profile-edit-btn" name="btnAddMore" value="Follow" onClick = {addFollowed} style={{background: "#0275d8", color: "white"}}/>
                                    :
                                    <input type="button" className="profile-edit-btn" name="btnAddMore" value="Unfollow" onClick = {addFollowed} style={{background: "red", color: "white"}}/>
                                }
                            </div>
                            <div className = "col-sm">
                                <a href="/myMessages"><input type="button" className="profile-edit-btn" name="btnAddMore" value="Message" style={{background: "#32cd32", color: "white"}}/> </a>
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