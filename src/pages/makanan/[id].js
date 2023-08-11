import React, { useRef, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Bawah from '../../../components/footer/Bawah'
import classes from '../../styles/meal.module.css'
import Image from 'next/image'
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai'
import emailjs from '@emailjs/browser'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MealDetails({meal}) {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [showForm, setShowFrom] = useState(false)
    const formRef = useRef()
    const handleCloseForm = () => setShowFrom(false)
    const handleEmail = (e) =>{
        e.preventDefault()
        emailjs.sendForm("service_xyrlg23", "template_th6o139", formRef.current, "n_cFrM_uuvBjZ_-8V")
        .then(()=>{
            toast.success('Email Sudah Terkirim Ke Email Anda' + email)
            handleCloseForm()
        }, (err)=>{
            toast.error(err.text)
        })
    }
  return (
    <>
    <Navbar />
    <div className={classes.container}>
    <div className={classes.wrapper}>
    <div className={classes.left}>
    <Image src={meal?.image} width='250' height='250' />
    </div>
    <div className={classes.right}>
    <h2 className={classes.title}>{meal?.title}</h2>
    <span className={classes.category}>Kategori: <span>{meal?.category}</span></span>
    <p className={classes.desc}>Deskripsi Makanan: <span>{meal?.desc?.length > 70 ? `${meal?.desc.slice(0, 70)}...}` : meal.desc}</span></p>
    <span className={classes.price}>Harga: Rp<span>{meal?.price}</span></span>
    <button onClick={()=>setShowFrom(true)} className={classes.orderButton}>Order Sekarang</button>
    <span className={classes.readyIn}>Makanan Akan Siap Dalam 30 Atau 45 Menit</span>
    </div>
    </div>
    {
        showForm && (
            <div className={classes.contactForm} onClick={handleCloseForm}>
            <div className={classes.contactFormWrapper} onClick={(e)=>e.stopPropagation()}>
            <h2>Order Makanan</h2>
            <form onSubmit={handleEmail} ref={formRef}>
            <input type='email' placeholder='Email' name='to_email' onChange={(e)=>setEmail(e.target.value)} />
            <textarea type='text' placeholder='Alamat' name='message' onChange={(e)=>setMessage(e.target.value)} />
            <button>Kirim</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/>
            </div>
            </div>
        )
    }
    <ToastContainer />
    </div>
    <Bawah />
    </>
  )
}

export async function getServerSideProps(ctx){
    const id = ctx.params.id
    const {data} = await axios.get(`http://localhost:3000/api/meal/${id}`)

    return{
        props:{
            meal: data
        }
    }
}

export default MealDetails