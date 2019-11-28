import React, { useState, useEffect } from "react";
import axios from "axios";

function Posts() {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);

    const fetchPosts = async() => {
        try {
            setLoading(true);
            setPosts(null);
            setError(null);
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setPosts(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    
    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러발생!</div>
    if (!posts) return null

    return (
        <>
            <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
            </ul>
            <button onClick={fetchPosts}>다시 불러오기</button>
        </>
    );
}

export default Posts;
