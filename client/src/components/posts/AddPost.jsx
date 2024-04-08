import React from 'react';

function AddPost({ arrOfPosts, setArrOfPosts, setAddScreen, setArrPostsToDisplay, user }) {

    function createPost(event) {
        event.preventDefault();
        let post = {
            userId: user.id,
            id: 0,
            title: event.target[0].value,
            body: event.target[1].value,
        }
        addPostToDb(post)
    }

    function addPostToDb(currentPost) {
        fetch(`http://localhost:8081/post`, {
            headers: { 'Content-Type': 'application/json', 'charset':'UTF-8' },
            method: 'POST',
            body: JSON.stringify({
                id: currentPost.id,
                userId: currentPost.userId,
                title: currentPost.title,
                body: currentPost.body
            })
        })
        .then(response => {if(!response.ok) throw new Error(`status: ${response.status}`); return response.json()})
        .then((response) => {
                alert("Post added succefuly!");
                currentPost.id=response["id"]
                setArrOfPosts([...arrOfPosts, currentPost]);
                setArrPostsToDisplay([...arrOfPosts, currentPost])
                setAddScreen(false)
            }).catch((err) => {console.error(err); alert("something went wrong please try later")})

    }

    return (<>
        <div><form onSubmit={createPost}>
            <label >title:</label>
            <input type="text" />
            <label >body:</label>
            <input type="text" />
            <button type='submit'>add</button>
        </form></div>
    </>)
}
export default AddPost