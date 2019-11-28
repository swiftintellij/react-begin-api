import React, { useReducer, createContext, useContext } from "react";
import axios from "axios";


const initialState = {
    posts: {
        loading: false,
        data: null,
        error: null
    },
    post: {
        loading: false,
        data: null,
        error: null
    }
};

const loadingState = {
    loading: true,
    data: null,
    error: null
};

const success = (data) => ({
    loading: false,
    data,
    error: null
});

const error = e => ({
    loading: true,
    data: null,
    error: e
});


function postReducer(state, action) {
    switch (action.type) {
    case "GET_POSTS":
        return {
            ...state,
            loading: loadingState
        };
    case "GET_POSTS_SUCCESS":
        return {
            ...state,
            posts: success(action.data)
        }
    case "GET_POSTS_ERROR":
        return {
            ...state,
            posts: error(action.error)
        }
    case "GET_POST":
        return {
            ...state,
            loading: loadingState
        };
    case "GET_POST_SUCCESS":
        return {
            ...state,
            post: success(action.data)
        }
    case "GET_POST_ERROR":
        return {
            ...state,
            post: error(action.error)
        }        
    default: 
        throw new Error(`Unhandled action ${action.type}`);
    }
}

const PostStateContext = createContext(null);
const PostDispatchContext = createContext(null);

export function PostProvider({children}) {
    const [state, dispatch] = useReducer(postReducer, initialState);
    return (
        <PostStateContext.Provider value={state}>
            <PostDispatchContext.Provider value={dispatch}>
                {children}
            </PostDispatchContext.Provider>
        </PostStateContext.Provider>        
    );
}

export function usePostState() {
    const state = useContext(PostStateContext);
    if (!state) {
        throw new Error('Not found PostProvider');
    }
    return state;
}

export function usePostDispatch() {
    const dispatch = useContext(PostDispatchContext);
    if (!dispatch) {
        throw new Error('Not found PostProvider');
    }
    return dispatch;
}

export async function getPosts(dispatch) {
    dispatch({type: "GET_POSTS"});

    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        dispatch({
            type: "GET_POSTS_SUCCESS",
            data: response.data,
        });
    } catch (e) {
        dispatch({
            type: "GET_POSTS_ERROR",
            error: e
        });
    }
}

export async function getPost(dispatch, id) {
    dispatch({type: "GET_POST"});
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        dispatch({
            type: "GET_POST_SUCCESS",
            data: response.data,
        });
    } catch (e) {
        dispatch({
            type: "GET_POST_ERROR",
            error: e
        });
    }

}