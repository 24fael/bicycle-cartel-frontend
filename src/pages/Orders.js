import React, {useContext} from 'react'
import UserContext  from "../contexts/UserContext";
import {Navigate} from 'react-router-dom'

export default function Orders(){
    const {user, setUser} = useContext(UserContext)

    console.log(user)

    return(
        (user.isAdmin === true || !user.regularUser) ?
            <Navigate to='/products'></Navigate>
        :
        <h1>Welcome to Orders!</h1>
    )
}