import React from 'react';
import user from "../images/user.jpg";
import {Link } from "react-router-dom";
 
const ContactDetails = (props) => {
    const {name, email} = props.location.state.contact;
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="userImg" />
                </div>
                <div className="content">
                    <div className="header">{name} </div>
                    <div className="description"> {email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                    <div className="ui button blue center">Back to contact List</div>
                </Link>
            </div>
        </div>
    );
}

export default ContactDetails;
