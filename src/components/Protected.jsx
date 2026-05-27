import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({ children }) {
    const isLoggedIn = !true

    return (
        <>
            {
                !isLoggedIn ?
                    <Navigate to="/" /> :
                    children
            }
        </>
    )
}

export default Protected