import React, { useState }from "react";
import axios from "axios";
import useAsync from "./useAsync";
import User from "./User";

async function getUsers() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
}

function Users() {

    const [state, refetch] = useAsync(getUsers, [], false);
    const {loading, error, data: users} = state;
    const [userId, setUserId] = useState(null);

    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러발생!</div>
    if (!users) return null;

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
        <button onClick={refetch}>사용자 목록 불러오기</button>
        {userId && <User id={userId}/>}
        </>
    );
}

export default Users;