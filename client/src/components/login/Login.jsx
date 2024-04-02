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

    function getUserFromDb(username, password) {
        // ?username=${username}&pasword=${password}
        fetch(`http://localhost:8081/user?username=${username}`
        )
            .then(response => response.json())
            .then(data => chackIfExsits(data));
    }

    function chackIfExsits(user_) {
        console.log(user_)
        if (user_.length == 0) {
            alert("user does not exist please sign up")
        } else {
            //לאמת סיסמא נכונה
            setUser(user_[0])
            localStorage.setItem("user", (JSON.stringify({ userId: user_[0].id, username: user_[0].username })));
            navigate(`/home/user/${parseInt((user_[0].id), 10)}`);
        }
    };

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

            <button onClick={() => {
                fetch(`http://localhost:8081/post`
                    , {
                        method: 'POST',
                        body: JSON.stringify({
                            id: 3,
                            userId: 2,
                            title: "kjhgf",
                            body: "lkjhgkjh"
                        })
                    })
                    // .then(response => response.json())
                    .then(r => { console.log(r) })
            }}
            >click me</button>

            <button onClick={() => { navigate('/register') }} >sign up</button>
        </>)
}

export default Login
