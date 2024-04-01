import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { useContext } from 'react';
import './info.css'
import { json, useNavigate } from "react-router-dom";
import { currentUserContext } from '../Main'

function Info() {
    const [user, setUser] = useContext(currentUserContext);

    return (
        <>
            <div className='info-container'>
                <h4>id: {user.id}</h4>
                <h4>name: {user.name}</h4>
                <h6>username: {user.username}</h6>
                <h6>phone: {user.phone}</h6>
                <h6>email: {user.email}</h6>
            </div>
        </>
    )
}

export default Info
