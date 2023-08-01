import React, { useRef, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Bawah from '../../../components/footer/Bawah'
import classes from '../../styles/meal.module.css'
import Image from 'next/image'
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai'

function MealDetails({meal}) {
    const [showForm, setShowFrom] = useState(false)
    const formRef = useRef()
    const handleCloseForm = () => setShowFrom(false)
    const handleEmail = () =>{

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
    <p className={classes.desc}>Deskripsi Makanan: {meal?.desc?.length > 70 ? `${meal?.desc.slice(0, 70)}...}` : meal.desc}</p>
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
            <input type='text' placeholder='Username' name='from_username' />
            <input type='email' placeholder='Email' name='to_email' />
            <textarea type='text' placeholder='Alamat' name='message'/>
            <button>Kirim</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/>
            </div>
            </div>
        )
    }
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