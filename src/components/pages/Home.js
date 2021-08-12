import React from 'react'
import Footer from "../widgets/Footer"

import cred from "../../images/credit-card.png"
import TextChanger from '../widgets/TextChanger'
import "../../styles/Home.css"
import { Link } from 'react-router-dom'
function Home() {
    return (
        <div className="home">
            <div className="home-contianer">
                <div className="contianer-fluid content1">
                    <div className="row">
                        <div className=" col-lg-9 col-md-9 col-sm-9  heading-text">
                            <h1> AMBNOX BANKING   </h1>

                            <div className="register">
                                <Link to="/register"><button className="button" >REGISTER NOW </button> </Link>
                                <TextChanger className="change" />
                                <br />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 flaticon">
                            <img className="icon" alt=" " src={cred} />
                        </div>
                    </div>
                    <div className="random">
                        <h4>xxxx xxxx xxxx xxxx    </h4>
                        <h5>valid upto mm/25</h5>
                    </div>

                </div>

                <div className="contianer content2">
                    <div className=" shit">
                        <h1 className="home-heading">SERVICES</h1>
                        <ul>
                            <Link to="/history"><li>TRANSACTIONS </li></Link>
                            <Link to="users"> <li>TRANSFER</li></Link>
                            {/* <Link to="/deposite"><li>DEPOSITE</li></Link>
                            <Link to="/withdraw"><li>WITHDRAW</li></Link> */}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
