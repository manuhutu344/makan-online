import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Bawah from '../../components/footer/Bawah'
import classes from '../styles/tambah.module.css'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import app from '@/firebase'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import axios from 'axios'

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
    const storage = getStorage(app)
    const filename = crypto.randomUUID() + photo.name
    const storageRef = ref(storage, filename)
    const uploadFile = uploadBytesResumable(storageRef, photo)
    uploadFile.on('state_changed',(snapshot)=>{
      switch(snapshot.state){
        case 'paused':
        console.log('upload sekarang terpaused')
        break
        case 'running':
        console.log('upload sekarang terpaused')
        break
        default:
          break
      }
    }, (error)=>{
      console.log(error)
    }, 
    async()=>{
      const fileUrl = await getDownloadURL(uploadFile.snapshot.ref)
      postMeal(fileUrl)
    })
  }
  const postMeal = async(imageUrl)=>{
    try {
      const {data} = await axios.post('http://localhost:3000/api/meal', {
        title,
        desc,
        category,
        price,
        image: imageUrl
      })
      router.push(`/meal/${data?._id}`)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
    <Navbar />
    <div className={classes.container}>
    <div className={classes.wrapper}> 
    <h2>Tambah Makanan</h2>
    <form onSubmit={handleSubmit}>
    <input type='text' placeholder='Masukan Judul Makanan' onChange={(e)=>setTitle(e.target.value)} />
    <input type='text' placeholder='Masukan Deskripsi Makanan' onChange={(e)=>setDesc(e.target.value)} />
    <select onChange={(e)=>setCategory(e.target.value)}>
    <option disabled>Pilih Kategori</option>
    <option value='Makanan Berat'>Makanan Berat</option>
    <option value='Makanan Ringan'>Makanan Ringan</option>
    <option value='Minuman'>Minuman</option>
    </select>
    <input type='number' placeholder='Masukan Harga' onChange={(e)=>setPrice(e.target.value)} />
    <div className={classes.imageField}>
    <label htmlFor='image'>
    foto <AiOutlineFileImage size={25} />
    </label>
    <input id='image' type='file' style={{display:'none'}} onChange={(e)=>setPhoto(e.target.files[0])} />
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