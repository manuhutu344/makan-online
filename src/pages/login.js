import React, { useState } from 'react'
import classes from '../styles/login.module.css'
import Navbar from '../../components/navbar/Navbar'
import Bawah from '../../components/footer/Bawah'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'
import {signIn} from 'next-auth/react'

function login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const res = await signIn('credentials', {
                username,
                password,
                redirect: false
            })
            if(res?.error == null){
                setTimeout(()=>{
                    toast.success("Kamu Berhasil Masuk")
                },500)
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <Navbar />
    <div className={classes.container}>
    <div className={classes.wrapper}>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
    <input type='text' placeholder='Masukan Username Anda' onChange={(e)=>setUsername(e.target.value)} />
    <input type='password' placeholder='Masukan Email Anda' onChange={(e)=>setPassword(e.target.value)} />
    <button type='submit'>Masuk</button>
    </form>
    </div>
    <ToastContainer />
    </div>
    <Bawah />
    </>
  )
}

export default login