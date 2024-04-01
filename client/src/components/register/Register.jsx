import react from "react";
import React, { useEffect, useState, useContext } from 'react';
import { currentUserContext } from '../Main'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import './registe.css'

function Register() {

    const [user, setUser] = useContext(currentUserContext);
    const [isExtendedDetailsOpen, setIsExtendedDetailsOpen] = useState(true);
    const [userIdentificationInformation, setUserIdentificationInformation] = useState({ username: "", website: "" });
    const [generalNumberOfUser, setGeneralNumberOfUser] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/generalNumberOfEachItem/user`).
            then(response => (response.json()))
            .then(data => setGeneralNumberOfUser(data))
    }, [isExtendedDetailsOpen])

    function filInExtendedDetails(data) {
        let currentUserId = (JSON.parse(parseInt(generalNumberOfUser.userGeneralNumber)) + 1).toString();
        console.log(currentUserId)
        fetch(`http://localhost:3000/users`, {
            method: 'POST',
            body: JSON.stringify({
                id: currentUserId,
                name: data.name,
                username: userIdentificationInformation.username,
                email: data.email,
                address: {
                    street: data.street,
                    suite:data.suit,
                    city: data.city,
                    zipcode: data.zipcode,
                    geo: {
                        lat: data.lat,
                        lng: data.lng,
                    }
                },
                phone: data.phone,
                website: userIdentificationInformation.website,
                company: {
                    name: data.name,
                    catchPhrase:  data.catchPhrase,
                    bs:  data.bs

                }
            })
        }).then(response => (response.json()))
            .then((data) => {
                alert("added ");
                setUser(data)
                localStorage.setItem("user", (JSON.stringify({ userId: data.id, username: data.username })));
                navigate(`/home/user/${currentUserId}`);

            })
        updategeneralNumberOfUser(currentUserId)
    }


    function updategeneralNumberOfUser(number) {
        const user = {
            id: "user",
            userGeneralNumber: number
        }
        fetch(`http://localhost:3000/generalNumberOfEachItem/user`, {
            method: "PUT",
            body: JSON.stringify(user),
        })
            .then(response => response.json());
    }

    const signUp = (data) => {
        let username = data.username;
        let password = data.password;
        let verifyPassword =data.verifyPassword;
        if (password != verifyPassword)
            alert("The passwords do not match")
        else {
            fetch(`http://localhost:3000/users?username=${username}`)
                .then((response) => response.json()).then((data) => {
                    if (data.length != 0) {
                        alert("User already exists:");

                    } else {

                        setIsExtendedDetailsOpen((isExtendedDetailsOpen) => !isExtendedDetailsOpen);
                        setUserIdentificationInformation({ username: username, website: password });
                        navigate('/register/details');
                    }
                }
                )
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
            {isExtendedDetailsOpen && <div> <form onSubmit={handleSubmit(signUp)} >
                <input type='text' placeholder='username' {...register("username", { required: true })} />
                {errors.usernam && errors.username.type === "required" && (<p className="errorMsg">Username is required.</p>)}
                <input type='password' placeholder='password'  {...register("password", { required: true })} />
                {errors.password && errors.password.type === "required" && (<p className="errorMsg">Password is required.</p>)}
                <input type='password' placeholder='verify-password'  {...register("verifyPassword", { required: true })} />
                {errors.verifyPassword && errors.verifyPassword.type === "required" && (<p className="errorMsg">Verify-password is required.</p>)}
                <input type="submit" value="sign up" />
            </form>
                <button onClick={() => { navigate('/login') }} >sign in</button></div>
            }

            {
                !isExtendedDetailsOpen && <form onSubmit={handleSubmit(filInExtendedDetails)}>

                    <input type='text' placeholder='name'  {...register("name", { required: true })} />
                    {errors.name && errors.name.type === "required" && (<p className="errorMsg">Name is required.</p>)}
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

                    <label htmlFor="address">address</label><br />
                    <input type='text' name="address" placeholder='street' {...register("street", { required: true })} />
                    {errors.street && errors.street.type === "required" && (<p className="errorMsg">Street is required.</p>)}
                    <br />

                    <input type='text' name="address" placeholder='suit'  {...register("suit", { required: true })} />
                    {errors.suit && errors.suit.type === "required" && (<p className="errorMsg">Suit is required.</p>)}
                    <br />
                    <input type='text' name="address" placeholder='city' {...register("city", { required: true })} />
                    {errors.city && errors.city.type === "required" && (<p className="errorMsg">City is required.</p>)}
                    <br />
                    <input type='text' name="address" placeholder='zipcode'  {...register("zipcode", { required: true , pattern: /^[0-9]+$/ })} />
                    {errors.zipcode && errors.zipcode.type === "required" && (<p className="errorMsg">Zipcode is required.</p>)}
                    {errors.zipcode && errors.zipcode.type === "pattern" && (<p className="errorMsg">Zipecode is not valid.</p>)}
                    <br />

                    <label htmlFor="geo">geo</label><br />
                    <input type='text' name="geo" placeholder='lat' {...register("lat", { required: true })} />
                    {errors.lat && errors.lat.type === "required" && (<p className="errorMsg">Lat is required.</p>)}
                    <br />
                    <input type='text' name="geo" placeholder='lng'  {...register("lng", { required: true })} />
                    {errors.lng && errors.lng.type === "required" && (<p className="errorMsg">Lng is required.</p>)}
                    <br />
                    <br />
                    <input type='tel' placeholder='phone'  {...register("phone", { required: true, pattern: /^[0-9]+$/ ,minLength:9,maxLength:10 })} />
                    {errors.phone && errors.phone.type === "required" && (<p className="errorMsg">Phone is required.</p>)}
                    {errors.phone && errors.phone.type === "pattern" && (<p className="errorMsg">Phone should include only numbers.</p>)}
                    {errors.phone && errors.phone.type === "minLength" && (<p className="errorMsg">Phone should be at-least 9 characters.</p>)}
                    {errors.phone && errors.phone.type === "maxLength" && (<p className="errorMsg">Phone should be not-more 9 characters.</p>)}

                    <br />

                    <label htmlFor="company">company</label><br />
                    <input type='text' name="company" placeholder='componyName' {...register("componyName", { required: true })} />
                    {errors.componyName && errors.componyName.type === "required" && (<p className="errorMsg">ComponyName is required.</p>)}
                    <br />
                    <input type='text' name="company" placeholder='catchPhrase'  {...register("catchPhrase", { required: true })} />
                    {errors.catchPhrase && errors.catchPhrase.type === "required" && (<p className="errorMsg">CatchPhrase is required.</p>)}
                    <br />
                    <input type='text' name="company" placeholder='bs'  {...register("bs", { required: true })} /><br />
                    {errors.bs && errors.bs.type === "required" && (<p className="errorMsg">Bs is required.</p>)}

                    <input type="submit" value="register" />
                </form>

            }

        </>
    )
}

export default Register





