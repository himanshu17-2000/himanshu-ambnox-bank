import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/Navbar.css"

function Navbar() {
    return (

        <div className="bar">
            <nav className="navbar navbar-expand-lg ">

                <div className="container-fluid">
                    <Link className="logo-link" to="/"  >
                        <div className="logo">
                            AMBNOX 
                        </div>
                    </Link>
                    
                </div>
            </nav>
        </div>

    )
}

export default Navbar
