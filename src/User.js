import React, {useEffect} from "react";
import { useUserState, useUserDispatch, getUser } from "./UserContext";


function User({id}) {
    const state = useUserState();
    const dispatch = useUserDispatch();

    useEffect(() => {
        getUser(dispatch, id);
    }, [dispatch, id]);

    const {loading, data: user, error} = state.user
     
    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러발생!</div>
    if (!user) return null;

    return (
        <div>
            <h4>{user.username}</h4>  
            <p><b>email: {user.email}</b></p>
        </div>
    );
}

export default User;