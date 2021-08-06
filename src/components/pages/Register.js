import React, { useState } from "react"
import "../../styles/Register.css"
import { db } from "../../Firebase"
function Register() {
    const [name, setname] = useState('')
    const [amount, setamount] = useState('')
    const [email, setemail] = useState('')
    const [number, setnumber] = useState("")



    function setnamehandler(e) {
        setname(e.target.value)
    }
    function setnumberhandler(e) {
        setnumber(e.target.value)

    }


    function setemailhandler(e) {
        setemail(e.target.value)

    }
    function setamountthandler(e) {
        setamount(e.target.value)
    }
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }




    function submithandler(e) {
        e.preventDefault()


        if (name !== "" && number !== "" && email !== "" && amount!=="") {
            var today = new Date();
            var dat = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            db.collection("customers").add({
                name: name,
                account: randomIntFromInterval(1000000000, 9999999999),
                email: email,
                amount: parseInt(amount),
                number: parseInt(number),
                date: dat
            })
                .then(() => {
                    console.log("HA BHAI HOGYA ADMISSION ")

                })
                .catch(error => {
                    alert(error.message)

                })
            setname("")
            setamount("")
            setemail("")
            setnumber("")



        }
        else {
            alert("saaari field bharo")
        }




    }

    return (

        <div className="container-fluid formcontainer">
            <h1 className="register-header">REGISTER HERE </h1>
            <form className="form" onSubmit={submithandler} >
                <div className="row p-0 m-0" >

                    <div className="inputfield">
                        <h3>Name</h3>
                        <input type="text" value={name} onChange={setnamehandler} />
                    </div>
                    <div className="inputfield">
                        <h3>Email</h3>
                        <input type="email" value={email} onChange={setemailhandler} />

                    </div>
                    <div className="  inputfield">
                        <h3>Number</h3>
                        <input type="text" value={number} onChange={setnumberhandler} />
                    </div>

                    <div className="  inputfield">
                        <h3>Amount</h3>
                        <input type="text" value={amount} onChange={setamountthandler} />
                    </div>


                    <div >
                        <button type="submit" className="btn button  submit btn-light">SUBMIT</button>
                    </div>
                </div>

            </form>

        </div>




    )
}



export default Register
