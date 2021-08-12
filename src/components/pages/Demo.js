import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import "../../styles/Demo.css"
import { db } from '../../Firebase'
import { name } from 'file-loader'

const Demo = () => {
    const { transfer } = useParams()

    const fromname = transfer
    const [sender, setsender] = useState(null)
    const [message, setmessage] = useState("")
    const [senderaccount, setsenderaccount] = useState(null)
    const [senderamount, setsenderammount] = useState(null)
    const [names, setNames] = useState([])
    const [toname, settoname] = useState("")
    const [money, setmoney] = useState("")

    const fetchfromInfo = () => {
        db.collection("customers").where("name", "==", fromname).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setsender(doc.data().name)
                    setsenderaccount(doc.data().account)
                    setsenderammount(doc.data().amount)


                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    useEffect(() => {
        setInterval(() => {
            fetchfromInfo()
        }, 100)

        db.collection("customers").onSnapshot((snapshot) => {
            setNames(snapshot.docs.map(doc => (doc.data().name)))

        })

    }, [])

    function submithandler(e) {
        e.preventDefault()

        if (toname !== "" && money !== "") {
            if (sender !== toname) {
                if (money <= senderamount) {
                    if (names.includes(toname)) {
                        db.collection("customers").where("name", "==", fromname).get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {

                                    db.collection("customers").doc(doc.id).set({
                                        name: doc.data().name,
                                        email: doc.data().email,
                                        account: doc.data().account,
                                        number: doc.data().number,
                                        amount: parseInt(doc.data().amount) - parseInt(money),
                                    })
                                })

                            })
                        db.collection("customers").where("name", "==", toname).get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    db.collection("customers").doc(doc.id).set({
                                        name: doc.data().name,
                                        email: doc.data().email,
                                        account: doc.data().account,
                                        number: doc.data().number,
                                        amount: parseInt(doc.data().amount) + parseInt(money),
                                    })

                                })


                            })
                        var today = new Date();
                        var date = today.getDate() + '-' + (today.getMonth() + 1) + "-" + today.getFullYear()
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        var unique = parseInt(today.getHours()) + parseInt(today.getMinutes()) + parseInt(today.getSeconds()) + parseInt(today.getDate()) + parseInt((today.getMonth() + 1)) + parseInt(today.getFullYear())
                        db.collection("history2").add({
                            from: fromname,
                            to: toname,
                            money: money,
                            time: time,
                            date: date,
                            series: unique,
                        })
                            .then(() => {
                                console.log(date, time, unique)

                            })
                            .catch(error => {
                                alert(error.message)
                            })
                        setmoney('')
                        settoname("")
                        setmessage(money + " rs transfered from " + fromname + " to " + toname)


                    }
                    else {

                        setmessage("reciever not found ")

                    }
                }
                else {

                    setmessage("amount insufficent")
                }


            }
            else {

                setmessage("Reciever same as sender")
            }

        }
        else {

            alert("all fields are compulsory")
        }

    }
    return (
        <div className="demo-class">
            <h1 className="demo-header">AMBNOX EXPRESS TRANSFER</h1>
            <div className="demo-intro">
                <span id="name">Name :- {sender}</span><br />
                <span id="account">Account :- {senderaccount}</span><br />
                <span id="amount">Amount :- {senderamount}</span><br />
            </div>
            <form className="demo-form" onSubmit={submithandler}>
                <label>Reciever </label><br />
                <input type="text" value={toname} onChange={(e) => {
                    settoname(e.target.value)
                }} /><br />
                <label>Amount </label><br />
                <input type="number" value={money} onChange={(e) => {
                    setmoney(e.target.value)
                }} />
                <br />
                <br />
                <br />
                <button className="btnn btn-success" type="submit" >Submit</button>
            </form>
            <h1 className="demo-message">{message}</h1>
        </div>
    )

}




export default Demo
