import React, { useState } from 'react';
import { useContext } from 'react';
import './info.css'
import { useForm } from 'react-hook-form';
import { currentUserContext } from '../Main'

function Info() {

    const [user, setUser] = useContext(currentUserContext);
    const [changePswd, setChangePswd] = useState(false)

    function changePassword(data) {
        // let curPswd = data.curPswd
        // let newPswd = data.newPswd
        let userId = user.id
        // console.log("The pswds: " + curPswd + " " + newPswd + "" + userId)
        fetch(`http://localhost:8081/password/${user.id}`,
            {
                headers: { 'Content-Type': 'application/json', 'charset': 'UTF-8' },
                method: 'PUT',
                body: JSON.stringify({
                    // userId: userId,
                    curPswd: data.curPswd,
                    newPswd: data.newPswd
                })
            })
            .then(result => result.json())
            .then(data => {
                console.log("The data: " + data.status+data+data["status"])
                if (data.status == 200) {
                    alert("password updated succefuly!")
                }
                else alert("password can't update try again")
                setChangePswd(false)
            })
    }
    function openChangePasswordForm() {
        setChangePswd(true)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <>
            <div className='info-container'>
                <h4>id: {user.id}</h4>
                <h4>name: {user.name}</h4>
                <h6>username: {user.username}</h6>
                <h6>phone: {user.phone}</h6>
                <h6>email: {user.email}</h6>
                <button onClick={openChangePasswordForm}>change password</button>
                {changePswd && <form onSubmit={handleSubmit(changePassword)}>
                    <input type="password" placeholder='current password' {...register("curPswd", { required: true })} />
                    <input type="password" placeholder='new password'{...register("newPswd", { required: true })} />
                    <button type='submit'>change</button>
                </form>}
            </div>
        </>
    )
}

export default Info
