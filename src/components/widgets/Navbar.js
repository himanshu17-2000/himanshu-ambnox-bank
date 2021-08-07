import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/Navbar.css"

function Navbar() {
    return (

        <div className="bar">
           

                <div className="container-fluid">
                    <Link className="logo-link" to="/"  >
                        <div className="logo">
                            <h1>AMBNOX</h1> 
                        </div>
                    </Link>
                    
                </div>
            
        </div>

    )
}

export default Navbar
