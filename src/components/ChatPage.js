import React from "react";
import axios from "axios";
import { backEndUrl } from "../App";
const currentUsr = localStorage.getItem("currUser");
const refreshIntervalMilliseconds = 3000;
const MessageBox = props => {
  let date = new Date(props.message.sentAt);
  let hours = date.getHours();
  if (hours < 10) {
    let prevHours = hours;
    hours = "0" + prevHours;
  }
  let minutes = date.getMinutes();
  let day = date.getUTCDate()
  if (minutes < 10) {
    let prevMinutes = minutes;
    minutes = "0" + prevMinutes;
  }
  let month = date.toLocaleString('default', { month: 'long' });
    return (
      <div className="media"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="user" width="50" className="rounded-circle"/>
            <div className="media-body ml-3">
              <div className="bg-light rounded py-2 px-3 mb-2">
                <p className="text-small mb-0 text-muted">{props.message.body}</p>
              </div>
              <p className="small text-muted">{day + " " + month + ", " + hours + ":" + minutes}</p>
            </div>
          </div>
    )
};

const OwnMessageBox = props => {    
  let date = new Date(props.message.sentAt);
  let hours = date.getHours();
  if (hours < 10) {
    let prevHours = hours;
    hours = "0" + prevHours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    let prevMinutes = minutes;
    minutes = "0" + prevMinutes;
  }
  let day = date.getUTCDate()
  let month = date.toLocaleString('default', { month: 'long' });
  return (
    <div className="media w-50 ml-auto mb-3">
      <div className="media-body">
        <div className="bg-primary rounded py-2 px-3 mb-2">
          <p className="text-small mb-0 text-white">{props.message.body}</p>
        </div>
        <p className="small text-muted">{day + " " + month + ", " + hours + ":" + minutes}</p>
        </div>
    </div>
  );
};

const ContactBox = props => {
  let inactiveClassName = "list-group-item list-group-item-action rounded-0";
  return (
    // Add active class & text-white to make it blue
    <a className= {!props.active ? inactiveClassName : inactiveClassName + " active text-white"} onClick={props.onClick}>
                <div className="media"><a href={`/users/${props.contact.username}`}><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="user" width="50" className="rounded-circle"/></a>
                  <div className="media-body ml-4">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h6 className="mb-0">{`${props.contact.firstName} ${props.contact.lastName}`}</h6><small className="small font-weight-bold"></small>
                    </div>
                    <p className="font-italic mb-0 text-small">{props.contact.status}</p>
                  </div>
                </div>
      </a>
  )
  
}

export default class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currDiscussion : [],
            users : [],
            currentContact : 0,
            currentContactUsername : "",
            messageBody: "",
        };
        this.userList = this.userList.bind(this);
        this.switchCurrentContact = this.switchCurrentContact.bind(this);
        this.discussionList = this.discussionList.bind(this);
        this.onChangeMessageBody = this.onChangeMessageBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    axiosFunc = () => {
      let token = (localStorage.getItem("accessToken"));
      let options = {
        params: {
          receiverName : this.state.currentContactUsername 
        }
      };
      if (token !== "null") {
        options = {
          headers: {
            "Authorization": "Bearer " + token
          },
          params: {
            receiverName : this.state.currentContactUsername 
          }
        }
      
      } else window.location.href = "/login";
      axios.get(backEndUrl + "/message", options)
      .then(res => {
        this.setState({
          currDiscussion : Array.from(res.data)
        })
      })
      .catch(err => {

      })
    }
    componentDidMount() {
      let token = (localStorage.getItem("accessToken"));
      let options = {
        params: {
          receiverName : this.state.currentContactUsername 
        }
      };
      if (token !== "null") {
        options = {
          headers: {
            "Authorization": "Bearer " + token
          }
        }
      
      } else window.location.href = "/login";

          axios.get(backEndUrl + "/user/all", options)
          .then((res) => {
              let usrArray = Array.from(res.data);
              this.setState({
                users: usrArray
              });
          })
          .then(() => {
            this.setState({
              currentContactUsername : Array.from(this.userList())[this.state.currentContact].username
            })
            axios.get(backEndUrl + "/message", options)
            .then(res => {
              this.setState({
                currDiscussion : Array.from(res.data)
              })
            })
            .catch(err => {

            })
          })
          .catch((err) => {
              //alert(err);
          })
          
    
          this.interval = setInterval(this.axiosFunc, refreshIntervalMilliseconds);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }
    
    switchCurrentContact(currentContactIndex) {
      let token = (localStorage.getItem("accessToken"));
      let options = {
        params: {
          receiverName : Array.from(this.userList())[currentContactIndex].username
        }
      };
      if (token !== "null") {
        options = {
          headers: {
            "Authorization": "Bearer " + token
          },
          params: {
            receiverName : Array.from(this.userList())[currentContactIndex].username
          }
        }
      
      }
      this.setState({
        currDiscussion : [],
        currentContact : currentContactIndex,
        currentContactUsername : Array.from(this.userList())[currentContactIndex].username
      });
      axios.get(backEndUrl + "/message", options)
      .then(res => {
        this.setState({
          currDiscussion : Array.from(res.data)
        })
      })
      .catch(err => {

      })
    }
    
    userList() {
      return Array.from(this.state.users).filter(currUser => currUser.username !== currentUsr);
    }

    discussionList() {
      return Array.from(this.state.currDiscussion);
    }

    onChangeMessageBody(e) {
      this.setState({
        messageBody: e.target.value
      })
    }

     onSubmit(e) {
      let token = (localStorage.getItem("accessToken"));
      let options = {};
      let options2 = {
        params: {
          receiverName : Array.from(this.userList())[this.state.currentContact].username
        }
      };
      if (token !== "null") {
        options = {
          headers: {
            "Authorization": "Bearer " + token
          }
        }
        options2 = {
          headers: {
            "Authorization": "Bearer " + token
          },
          params: {
            receiverName : Array.from(this.userList())[this.state.currentContact].username
          }
        }
      }
      e.preventDefault();
      // Get the sender & receiver(& trim the strings to remove whitespaces)
      let receiver = this.state.users.find(user => this.state.currentContactUsername.trim() === user.username.trim());
       axios.post(backEndUrl + "/message", {
        receiverId : receiver.id,
        body : this.state.messageBody,
        date: Date.now(),
        inputPlaceholder : "Type here"
      }, options)
      .then(res => {
        axios.get(backEndUrl + "/message", options2)
        .then(res => {
          this.setState({
            currDiscussion : Array.from(res.data),
            messageBody : ""
          })
        })
        .catch(err => {
  
        })
      })
      .catch(err => {
      })
    }

    render() {
      let message;
      //alert(this.state.currentContactUsername);
      // Do not show the own user
      let contactArray = this.userList();
      let discussionArray = this.discussionList();

    return (
      <div className="container py-5 px-4">
      <div className="row rounded-lg overflow-hidden shadow ">

        <div className="col-5 px-0 messageScroll">
          <div className="bg-white">
            
            <div className="bg-gray px-4 py-2 bg-light">
              <div className = "row">
              <p className="h5 mb-0 py-1 col">Users</p>
              </div>
            </div>
              
            <div className="messages-box">
              <div className="list-group rounded-0">
              {contactArray.map(currentContact => {
                //alert(currentUser.mostRecentMessage);
                  return (
                    <ContactBox contact = {currentContact} active = {contactArray.indexOf(currentContact) === this.state.currentContact} onClick={() => {this.switchCurrentContact(contactArray.indexOf(currentContact))}}></ContactBox>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col-7 px-0">
          
          <div className="px-4 py-5 chat-box bg-white messageScroll">
          {
            (this.state.currDiscussion.length === 0) ?
                <div className = "d-flex align-items-center justify-content-center"><h1>Why don't you say hi?</h1></div> :
                discussionArray.map(currentMessage => {
                  return (currentMessage.senderUsername === currentUsr) ? <OwnMessageBox message = {currentMessage}></OwnMessageBox> : <MessageBox message = {currentMessage} ></MessageBox>
                })
          }
          
          </div>
    
          <form onSubmit={this.onSubmit} className="bg-light">
            <div className="input-group">
              <input value = {this.state.messageBody} type="text" placeholder="Type here" aria-describedby="button-addon2" onChange={this.onChangeMessageBody} className="form-control rounded-0 border-0 py-4 bg-light"/>
              <div className="input-group-append">
                <button id="button-addon2" type="submit" className="btn btn-link"> <i className="fa fa-paper-plane"></i></button>
              </div>
            </div>
          </form>
    
        </div>
        </div>
        </div>
    );
    }
}