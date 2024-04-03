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
                userId: currentPost.userId,
                id: currentPost.id,
                title: currentPost.title,
                body: currentPost.body
            })
        })
        .then(response => (response.json()))
            .then((response) => {
                alert("Post added succefuly!");
                currentPost.id=response["id"]
                setArrOfPosts([...arrOfPosts, currentPost]);
                setArrPostsToDisplay([...arrOfPosts, currentPost])
                setAddScreen(false)
            }).catch(ex=>console.log(ex))
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