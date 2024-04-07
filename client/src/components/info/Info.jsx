import React, { useState } from 'react';
import { useContext } from 'react';
import './info.css'
import { currentUserContext } from '../Main'

function Info() {

    const [user, setUser] = useContext(currentUserContext);
    const [changePswd, setChangePswd] = useState(false)
    function changePassword() {

    }
    function openChangePasswordForm() {

    }
    return (
        <>
            <div className='info-container'>
                <h4>id: {user.id}</h4>
                <h4>name: {user.name}</h4>
                <h6>username: {user.username}</h6>
                <h6>phone: {user.phone}</h6>
                <h6>email: {user.email}</h6>
                <button onClick={openChangePasswordForm}>change password</button>
                {changePswd && <form onSubmit={changePassword}>
                    <input type="text" >current password</input>
                    <input type="text" >new password</input>
                    <button type='submit'>change</button>
                </form>}
            </div>
        </>
    )
}

export default Info
