import React, { useState }from "react";
import User from "./User";
import { useUserState, useUserDispatch, getUsers } from "./UserContext";


function Users() {

    const [userId, setUserId] = useState(null);
    const state = useUserState();
    const dispatch = useUserDispatch();

    const { loading, error, data: users} = state.users

    const fetchData = () => {
        getUsers(dispatch);
    }
    
    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러발생!</div>
    if (!users) return <button onClick={fetchData}>사용자 목록 불러오기</button>

    return (
        <>
        <ul>
        { users.map( 
            user => (
            <li onClick={() => setUserId(user.id)} key={user.id}>
                {user.username} {user.name}
            </li>)
        )}
        </ul>
        <button onClick={fetchData}>사용자 목록 불러오기</button>
        {userId && <User id={userId}/>}
        </>
    );
}

export default Users;