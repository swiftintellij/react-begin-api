import React, {useState} from "react";
import Post from "./Post";
import { usePostState, usePostDispatch, getPosts } from "./PostContext";

function Posts() {

    const state = usePostState();
    const dispatch = usePostDispatch();

    const { loading, error, data: posts} = state.posts;
    const [postId, setPostId] = useState(null);

    const fetchData = () => {
        getPosts(dispatch);
    }

    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러발생!</div>
    if (!posts) return <button onClick={fetchData}>포스트 목록 불러오기</button>

    return (
        <>
            <ul>
            {posts.map(post => (
                <li onClick={() => setPostId(post.id)} key={post.id}>{post.title}</li>
            ))}
            </ul>
            <button onClick={fetchData}>포스트 목록 불러오기</button>
            { postId && <Post id={postId}/> }
        </>
    );
}

export default Posts;
