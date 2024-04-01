import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import React from 'react'
import Login from './login/Login'
import Home from './home/Home'
import Register from './register/Register'
import Info from './info/Info'
import Todos from './todos/Todos'
import Posts from './posts/Posts'
import Albums from './albums/Albums'
import Photos from './photos/Photos'
import Comments from './comments/Comments'
import PostsLayout from './posts/PostsLayout'
import AlbumLayout from './albums/AlbumsLayout'
import AddTodo from './todos/AddTodo'
import TodosLayout from './todos/TodosLayout'
import { useState, useEffect, useContext, createContext } from 'react'
import NoPageFound from './NoPageFound'


export const currentUserContext = createContext('');

function Main() {
    const [user, setUser] = useState({})

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        user && fetch(`http://localhost:3000/users?username=${user.username}`)
            .then(response =>
                response.json())
                .then(data => setUser(data[0]))
    }, []);


    return (
        <>
            <currentUserContext.Provider value={[user, setUser]}>

                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to={"/login"} />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} >
                            <Route path="details" element={<Register />} />
                        </Route>
                        <Route path="home/user/:id" element={<Home />} >
                            <Route path="info" element={<Info />} />
                            <Route path="todos" element={<TodosLayout />} >
                                <Route index element={<Todos />} />
                            </Route>
                            <Route path="posts" element={<PostsLayout />} >
                                <Route index element={<Posts />} />
                                <Route path=":id/comments" element={<Comments />} />
                            </Route>
                            <Route path="albums" element={<AlbumLayout />} >
                                <Route index element={<Albums />} />
                                <Route path=":albumId/photos" element={<Photos />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<NoPageFound />} />
                    </Routes>
                </Router>
            </currentUserContext.Provider >

        </>
    )
}
export default Main
