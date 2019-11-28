import React from "react";
import axios from "axios";
import useAsync from "./useAsync";

async function getPost(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.data;
}

function Post({ id }) {

    const [state] = useAsync(() => getPost(id), [id], false);
    const {loading, data: post, error} = state;

    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러발생!</div>
    if (!post) return null

    return (
        <div>
            <h4>{post.title}</h4>
            <p><b>{post.body}</b></p>
        </div>
    );
}

export default Post;