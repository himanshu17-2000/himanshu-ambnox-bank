import React from 'react'
import Footer from "../widgets/Footer"

import cred from "../../images/credit-card.png"
import Text_changer from '../widgets/Text_changer'
import "../../styles/Home.css"
import { Link } from 'react-router-dom'
function Home() {
    return (
        <div className="home">
            <div className="home-contianer">
                <div className="contianer content1">
                    <div className="heading-text">
                        <h1> AMBNOX  </h1>
                        <span>Group of banks</span>
                    </div>
                    <div className="flaticon">

                        <img className="icon"  alt =" " src={cred} />
                    </div>
                    <div className="flaticon">

                        <Link to="/register"><button className="btn btn-dark">REGISTER NOW </button> </Link>
                    </div>
                    <Text_changer />
                </div>

                <div className="contianer content2">
                    <div className="row shit">
                        <h1 className="home-heading">SERVICES</h1>
                        <ul>
                            <li><Link to="users">TRANSFER</Link></li>
                            <li><Link to="/history">  TRANSACTIONS </Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
