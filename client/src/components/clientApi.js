import axios from 'axios'

const URL = 'http://127.0.0.1:5000'
export const get_users = ()=>{
    axios.get(`${URL}/get_users`).then((res)=>{
        console.log(res.data)
        return res.data
    }).catch((err)=>{console.log(err)})
}
export const register_users = (user)=>{
    // const user = {name:"mangesh",email:"mangesh@gmail.com",phone:"7898789239" ,amount :"2000"}
    axios.post(`${URL}/register` , user).then((res)=>{
        console.log("api", res.data)
        return res.data
    }).catch((err)=>{console.log(err)})
}

export const transfer = (transaction)=>{
    // const user = {name:"mangesh",email:"mangesh@gmail.com",phone:"7898789239" ,amount :"2000"}
    axios.post(`${URL}/transfer` , transaction).then((res)=>{
        console.log("api", res.data)
        return res.data
    }).catch((err)=>{console.log(err)})
}
export const get_transactions = ()=>{
    // const user = {name:"mangesh",email:"mangesh@gmail.com",phone:"7898789239" ,amount :"2000"}
    axios.get(`${URL}/get_transactions`).then((res)=>{
        console.log("api", res.data)
        return res.data
    }).catch((err)=>{console.log(err)})
}

export const get_user_by_id = (id)=>{
    // const user = {name:"mangesh",email:"mangesh@gmail.com",phone:"7898789239" ,amount :"2000"}
    axios.get(`${URL}/user/${id}`).then((res)=>{
        console.log("api", res.data)
        return res.data
    }).catch((err)=>{console.log(err)})
}

export const withdraw_deposite = (instruction)=>{
    // const user = {name:"mangesh",email:"mangesh@gmail.com",phone:"7898789239" ,amount :"2000"}
    axios.post(`${URL}/withdraw_deposite`, instruction).then((res)=>{
        console.log("api", res.data)
        return res.data
    }).catch((err)=>{console.log(err)})
}
