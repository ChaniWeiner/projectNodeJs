import React, { useEffect, useState, useRef } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { json, useNavigate, useLocation } from "react-router-dom";
import { currentUserContext } from '../Main'

function AddPost({ arrOfPosts, setArrOfPosts, setAddScreen, setArrPostsToDisplay, user }) {

    function getGenralPostId(event) {
        event.preventDefault();
        let post = {
            userId: user.id,
            id: 0,
            title: event.target[0].value,
            body: event.target[1].value,
        }
        fetch(`http://localhost:8081/generalNumberOfEachItem/posts`).
            then(response => (response.json()))
            .then(data => addPostToDb(data, post))

    }

    function addPostToDb(generalNumberOfPost, currentPost) {
        currentPost.id = (JSON.parse(parseInt(generalNumberOfPost.postsGeneralNumber)) + 1).toString();
        fetch(`http://localhost:8081/posts`, {
            method: 'POST',
            body: JSON.stringify({
                userId: currentPost.userId,
                id: currentPost.id,
                title: currentPost.title,
                body: currentPost.body
            })
        }).then(response => (response.json()))
            .then(() => {
                alert("added ");
                setArrOfPosts([...arrOfPosts, currentPost]);
                setArrPostsToDisplay([...arrOfPosts, currentPost])
            })
        updateGeneralNumberOfPost(currentPost.id)
    }


    function updateGeneralNumberOfPost(number) {
        fetch(`http://localhost:8081/generalNumberOfEachItem/posts`, {
            method: "PATCH",
            body: JSON.stringify({
                postsGeneralNumber: number
            }),
        }).then(response => response.json()).then(setAddScreen(false)
        );
    }

    return (<>
        <div><form onSubmit={getGenralPostId}>
            <label >title:</label>
            <input type="text" />
            <label >body:</label>
            <input type="text" />
            <button type='submit'>add</button>
        </form></div>
    </>)
}
export default AddPost