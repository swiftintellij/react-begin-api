import React, {useEffect} from "react";
import { usePostState, usePostDispatch, getPost } from "./PostContext";

function Post({ id }) {

    const state = usePostState();
    const dispatch = usePostDispatch();

    const {loading, data: post, error} = state.post;

    useEffect(() => {
        getPost(dispatch, id);
    }, [dispatch, id])

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