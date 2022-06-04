import React, { useEffect, useContext } from 'react'
import {Navigate} from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import CartContext from '../contexts/CartContext'

export default function Logout(){
    const {unsetUser, setUser} = useContext(UserContext)
    const {unsetCart} = useContext(CartContext)

    unsetUser()

    unsetCart()

    useEffect(() => {
        setUser({
            accessToken: null
        })
    }, [])

    return (
        <Navigate to='/'/>
    )
}