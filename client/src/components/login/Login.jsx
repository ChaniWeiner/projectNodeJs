import React from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { currentUserContext } from '../Main'
import { useForm } from 'react-hook-form';
import './login.css'

function Login() {

    const [user, setUser] = useContext(currentUserContext);
    const navigate = useNavigate();

    function login(data) {
        getUserFromDb(data.username, data.password);
    }

    // function getUserFromDb(username, password) {
    //     console.log("The username: " + username)
    //     fetch(`http://localhost:8081/user?username=${username}`)
    //         .then(response => {
    //             if (response.status == 200)
    //                 return response.json();
    //             else
    //                 alert("user does not exist please sign up");
    //         })
    //         .then(data => {
    //             if (data != undefined){
    //                 checkIfExsits(data["data"], password);}
    //         })
    // }


    // function checkIfExsits(user_, password) {
    //     if (user_ == null) {
    //         alert("user does not exist please sign up")
    //     } else {
    //         console.log("user: " + user_)
    //         fetch(`http://localhost:8081/password`,
    //             {
    //                 headers: { 'Content-Type': 'application/json', 'charset': 'UTF-8' },
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     userId: user_.id,
    //                     password: password
    //                 })
    //             })
    //             .then(data => {
    //                 console.log("data: " + data.status)
    //                 if (data.status == 200) {
    //                     setUser(user_)
    //                     localStorage.setItem("user", (JSON.stringify({ userId: user_.id, username: user_.username })))
    //                     navigate(`/home/user/${parseInt((user_.id), 10)}`);
    //                 } else alert("user does not exist please sign up")
    //             })
    //     }
    // }
    function getUserFromDb(username, password) {
        console.log("The username: " + username)
        fetch(`http://localhost:8081/login`,
            {
                headers: { 'Content-Type': 'application/json', 'charset': 'UTF-8' },
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(result=>result.json())
            .then(data => {
                console.log("The data: " + data.status+data.data+data.data.id+data.status+data["data"].phone)
                if (data.status == 200) {
                    let user = data["data"]
                    setUser(user)
                    localStorage.setItem("user", (JSON.stringify({ userId: user.id, username: user.username })))
                    navigate(`/home/user/${parseInt((user.id), 10)}`);
                }
                else alert("user does not exist please sign up")
            })
    }


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            <form onSubmit={handleSubmit(login)}>
                <h2>sign in</h2>
                <input type='text' placeholder='username' {...register("username", { required: true })} />
                <input type='password' placeholder='password' {...register("password", { required: true })} />
                <input type="submit" value="sign in" />
                {errors.username && errors.username.type === "required" && (
                    <p className="errorMsg">Username is required.</p>)}
                {errors.password && errors.password.type === "required" && (
                    <p className="errorMsg">Password is required.</p>)}
            </form>

            <button onClick={() => { navigate('/register') }} >sign up</button>
        </>)
}

export default Login
