import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import React from 'react'
import Login from './login/Login'
import Home from './home/Home'
import Register from './register/Register'
import Info from './info/Info'
import Todos from './todos/Todos'
import Posts from './posts/Posts'
import Comments from './comments/Comments'
import PostsLayout from './posts/PostsLayout'
import TodosLayout from './todos/TodosLayout'
import { useState, useEffect, useContext, createContext } from 'react'
import NoPageFound from './NoPageFound'


export const currentUserContext = createContext('');

function Main() {
    const [user, setUser] = useState({})

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        user && fetch(`http://localhost:8081/user?username=${user.username}`)
            .then(response => response.json())
            .then(data => setUser(data))
    }, []);


    return (<>
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
                        </Route>
                        
                        <Route path="*" element={<NoPageFound />} />
                    </Routes>
                </Router>
            </currentUserContext.Provider >
        </>)
}

export default Main
