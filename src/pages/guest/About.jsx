import React from 'react'
import { Outlet } from 'react-router-dom'

function About() {
    return (
        <div>
            Banner
            <Outlet />
        </div>
    )
}

export default About