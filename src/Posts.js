import React, {useState} from "react";
import axios from "axios";
import useAsync from "./useAsync";
import Post from "./Post";

async function getPosts() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
}

function Posts() {

    const [state, refetch] = useAsync(getPosts, [], true);
    const { loading, error, data: posts} = state;
    const [postId, setPostId] = useState(null);

    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러발생!</div>
    if (!posts) return <button onClick={refetch}>포스트 목록 불러오기</button>

    return (
        <>
            <ul>
            {posts.map(post => (
                <li onClick={() => setPostId(post.id)} key={post.id}>{post.title}</li>
            ))}
            </ul>
            <button onClick={refetch}>포스트 목록 불러오기</button>
            { postId && <Post id={postId}/> }
        </>
    );
}

export default Posts;
