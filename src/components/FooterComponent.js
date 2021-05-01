import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
    return (
      <MDBFooter style={{background: "#0275d8", color: "white"}} className="font-small pt-4 mt-4 footer">
        <div className="container">
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="6">
              <h5 className="title">Project Details</h5>
                <p>Back-end technologies: Java(Spring Boot, MVC & Security, Lombok), MySQL & Hibernate ORM</p>
                <p>Front-end technologies: JavaScript(React.js)</p>
            </MDBCol>
            <MDBCol md="6" className="float-right">
              <h5 className="title">My Links</h5>
              <ul>
                <li className="list-unstyled">
                  <a href="https://www.linkedin.com/in/alexandru-mihailescu-a70870203/" style={{color: "white"}}>LinkedIn</a>
                </li>
                <li className="list-unstyled">
                  <a href="https://github.com/alexmihailescu99/" style={{color: "white"}}>GitHub</a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        
        </div>
        <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: <a href="" style={{color: "white"}}> Alex Mihailescu</a> @ <a href ="https://www.softbinator.com/labs" style={{color: "white"}}>Softbinator Labs</a>
          </MDBContainer>
        </div>
      </MDBFooter>
    );
}

export default function FooterComponent(props) {
    return (
        FooterPage()
    )
}