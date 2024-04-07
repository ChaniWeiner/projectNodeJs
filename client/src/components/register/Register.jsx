import React, { useEffect, useState, useContext } from 'react';
import { currentUserContext } from '../Main'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import './registe.css'

function Register() {

    const [user, setUser] = useContext(currentUserContext);
    const [verifyFail, setVerifyFail] = useState(false)
    const [isExtendedDetailsOpen, setIsExtendedDetailsOpen] = useState(true);
    const [userIdentificationInformation, setUserIdentificationInformation] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    useEffect(() => { setVerifyFail(false) }, [])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function signUp(data) {
        fetch(`http://localhost:8081/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'charset': 'UTF-8' },
            body: JSON.stringify([{
                id: null,
                name: data.name,
                username: userIdentificationInformation.username,
                email: data.email,
                phone: data.phone
            },
            { userId: null, password: userIdentificationInformation.password }
            ])
        })
            .then(response => response.json())
            .then((data) => {
                alert("added ");
                setUser(data["user"])
                localStorage.setItem("user", (JSON.stringify({ userId: data["user"].id, username: data["user"].username })));
                navigate(`/home/user/${data["user"].id}`);
            })
    }

    const getIn = (data) => {
        setVerifyFail(false)
        let username = data.username;
        let password = data.password;
        let verifyPassword = data.verifyPassword;
        if (password != verifyPassword)
            setVerifyFail(true);
        else {
            fetch(`http://localhost:8081/user?username=${username}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.status)
                    if (data.status == 200) {
                        alert("User already exists, please log in");
                    }
                    else {
                        console.log()
                        setIsExtendedDetailsOpen((isExtendedDetailsOpen) => !isExtendedDetailsOpen);
                        setUserIdentificationInformation({ username: username, password: password });
                        navigate('/register/details');
                    }
                })
        }
    }

    function getInForm() {
        return <div>
            <form onSubmit={handleSubmit(getIn)} >
                <input type='text' placeholder='username' {...register("username", { required: true })} />
                {errors.usernam && errors.username.type === "required" && (<p className="errorMsg">Username is required.</p>)}
                <input type='password' placeholder='password'  {...register("password", { required: true })} />
                {errors.password && errors.password.type === "required" && (<p className="errorMsg">Password is required.</p>)}
                <input type='password' placeholder='verify-password'  {...register("verifyPassword", { required: true })} />
                {errors.verifyPassword && errors.verifyPassword.type === "required" && (<p className="errorMsg">Verify-password is required.</p>)}
                {verifyFail && <p className="errorMsg">Verification failed please try again.</p>}
                <input type="submit" value="sign up" />
            </form>
            <button onClick={() => { navigate('/login') }} >sign in</button>
        </div>
    }

    // function phoneErrors() {
    //     let types = ["required", "pattern", "minLength", "maxLength"]
    //     let messages = ["Phone is required.", "Phone should include only numbers.",
    //         "Phone should be at-least 9 characters.", "Phone should be not-more 9 characters."
    //     ]
    //     for (let index = 0; index < types.length; index++) {
    //         return errors.phone && errors.phone.type === types[index] && (<p className="errorMsg">{messages[index]}</p>)
    //     }
    // }

    function detailesForm() {

        return <form onSubmit={handleSubmit(signUp)}>
            <h3>Just a few more details and you're in!</h3>
            <input type='text' placeholder='name'  {...register("name", { required: true })} />
            {errors.name && errors.name.type === "required" && (<p className="errorMsg">Name is required.</p>)}
            <br />
            <input type='email' placeholder='email' {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
            })} />
            {errors.email && errors.email.type === "required" && (<p className="errorMsg">Email is required.</p>)}
            {errors.email && errors.email.type === "pattern" && (<p className="errorMsg">Email is not valid.</p>)}
            <br />
            <input type='tel' placeholder='phone' {...register("phone", { required: true, pattern: /^[0-9]+$/, minLength: 9, maxLength: 10 })} />
            {/* {phoneErrors()} */}
            {errors.phone && errors.phone.type === "required" && (<p className="errorMsg">Phone is required.</p>)}
            {errors.phone && errors.phone.type === "pattern" && (<p className="errorMsg">Phone should include only numbers.</p>)}
            {errors.phone && errors.phone.type === "minLength" && (<p className="errorMsg">Phone should be at-least 9 characters.</p>)}
            {errors.phone && errors.phone.type === "maxLength" && (<p className="errorMsg">Phone should be not-more 9 characters.</p>)}
            <br />
            <input type="submit" value="register" />
        </form>
    }

    return (
        <>
            <h3>Register</h3>
            {isExtendedDetailsOpen && getInForm()}
            {!isExtendedDetailsOpen && detailesForm()}
        </>)
}

export default Register





