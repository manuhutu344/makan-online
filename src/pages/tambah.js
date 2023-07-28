import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Bawah from '../../components/footer/Bawah'
import classes from '../styles/tambah.module.css'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'

function tambah() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('Makanan Berat')
  const [price, setPrice] = useState(50)
  const [photo, setPhoto] = useState('')
  const router = useRouter()
  const session = useSession()

  useEffect(()=>{
    if(session.status === 'loading') return
    if(session.status !== 'authenticated'){
      signIn()
    }
  }, [session.status])

  const handleSubmit = async (e) =>{
    e.preventDefault()
  }
  return (
    <>
    <Navbar />
    <div className={classes.container}>
    <div className={classes.wrapper}> 
    <h2>Tambah Makanan</h2>
    <form onSubmit={handleSubmit}>
    <input type='text' placeholder='Masukan Judul Makanan' onChange={()=>{}} />
    <input type='text' placeholder='Masukan Deskripsi Makanan' onChange={()=>{}} />
    <select onChange={()=>{}}>
    <option disabled>Pilih Kategori</option>
    <option value='Makanan Berat'>Makanan Berat</option>
    <option value='Makanan Ringan'>Makanan Ringan</option>
    <option value='Minuman'>Minuman</option>
    </select>
    <input type='number' placeholder='Masukan Harga' onChange={()=>{}} />
    <div className={classes.imageField}>
    <label htmlFor='image'>
    foto <AiOutlineFileImage size={25} />
    </label>
    <input id='image' type='file' style={{display:'none'}} onChange={()=>{}} />
    </div>
    <button>Post</button>
    </form>
    </div>
    </div>
    <Bawah />
    </>
  )
}

export default tambah