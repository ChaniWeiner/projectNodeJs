import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { useContext } from 'react';
import './info.css'
import { json, useNavigate } from "react-router-dom";
import { currentUserContext } from '../Main'

function Info() {
    const[user,setUser]=useContext(currentUserContext);

    return (
        <>
            <div className='info-container'>
                <h4>id: {user.id}</h4>
                 <h4>name: {user.name}</h4>
                <h6>phone: {user.phone}</h6>
                <h6>username: {user.username}</h6>
                <h6>email: {user.email}</h6>
                <h4>address</h4>
                <h6>street: {user.address.street}</h6>
                <h6>suite: {user.address.suite}</h6>
                <h6>city: {user.address.city}</h6>
                <h6>zicode: {user.address.zipcode}</h6>
                <h5>geo</h5>
                <h6>lat: {user.address.geo.lat}</h6>
                <h6>lng: {user.address.geo.lng}</h6>
                <h4>company</h4>
                <h6>name: {user.company.name}</h6>
                <h6>catchPhrase: {user.company.catchPhrase}</h6>
                <h6>bs: {user.company.bs}</h6> 
            </div>
        </>
    )
}

export default Info
