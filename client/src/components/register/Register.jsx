import React, { useEffect, useState, useContext } from 'react';
import { currentUserContext } from '../Main'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import './registe.css'

function Register() {

    const [user, setUser] = useContext(currentUserContext);
    const [isExtendedDetailsOpen, setIsExtendedDetailsOpen] = useState(true);
    const [userIdentificationInformation, setUserIdentificationInformation] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    function filInExtendedDetails(data) {
        fetch(`http://localhost:8081/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'charset': 'UTF-8' },
            body: JSON.stringify({
                id: data.id,
                name: data.name,
                username: userIdentificationInformation.username,
                email: data.email,
                phone: data.phone
            })
        })
            .then(response => response.json())
            .then((data) => {
                alert("added ");
                setUser(data["user"])
                localStorage.setItem("user", (JSON.stringify({ userId: data["user"].id, username: data["user"].username })));
                navigate(`/home/user/${data["user"].id}`);
            })
    }

    const signUp = (data) => {
        let username = data.username;
        let password = data.password;
        let verifyPassword = data.verifyPassword;
        if (password != verifyPassword)
            alert("The passwords do not match")
        else {
            fetch(`http://localhost:8081/user?username=${username}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.status)
                    if (data.status == 200) {
                        alert("User already exists");
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            <h3>Register</h3>
            {isExtendedDetailsOpen && <div>
                <form onSubmit={handleSubmit(signUp)} >
                    <input type='text' placeholder='username' {...register("username", { required: true })} />
                    {errors.usernam && errors.username.type === "required" && (<p className="errorMsg">Username is required.</p>)}
                    <input type='password' placeholder='password'  {...register("password", { required: true })} />
                    {errors.password && errors.password.type === "required" && (<p className="errorMsg">Password is required.</p>)}
                    <input type='password' placeholder='verify-password'  {...register("verifyPassword", { required: true })} />
                    {errors.verifyPassword && errors.verifyPassword.type === "required" && (<p className="errorMsg">Verify-password is required.</p>)}
                    <input type="submit" value="sign up" />
                </form>
                <button onClick={() => { navigate('/login') }} >sign in</button>
            </div>}

            {!isExtendedDetailsOpen && <form onSubmit={handleSubmit(filInExtendedDetails)}>
                <h3>Just a few more details and you're in!</h3>
                <input type='text' placeholder='name'  {...register("name", { required: true })} />
                {errors.name && errors.name.type === "required" && (<p className="errorMsg">Name is required.</p>)}
                <br />
                <input type='text' placeholder='id'  {...register("id", { required: true })} />
                {errors.id && errors.id.type === "required" && (<p className="errorMsg">Id is required.</p>)}
                <br />
                <input type='email' placeholder='email' {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                })} />
                {errors.email && errors.email.type === "required" && (
                    <p className="errorMsg">Email is required.</p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                    <p className="errorMsg">Email is not valid.</p>
                )}
                <br />

                <input type='tel' placeholder='phone'  {...register("phone", { required: true, pattern: /^[0-9]+$/, minLength: 9, maxLength: 10 })} />
                {errors.phone && errors.phone.type === "required" && (<p className="errorMsg">Phone is required.</p>)}
                {errors.phone && errors.phone.type === "pattern" && (<p className="errorMsg">Phone should include only numbers.</p>)}
                {errors.phone && errors.phone.type === "minLength" && (<p className="errorMsg">Phone should be at-least 9 characters.</p>)}
                {errors.phone && errors.phone.type === "maxLength" && (<p className="errorMsg">Phone should be not-more 9 characters.</p>)}

                <br />

                <input type="submit" value="register" />
            </form>}
        </>)
}

export default Register





