import React, { useEffect, useState } from 'react'
import classes from './catalog.module.css'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import {FcFullTrash} from 'react-icons/fc'
import { useSession } from 'next-auth/react'

function Catalog({meals = []}) {
  console.log(meals)
  const [activeCategory, setActiveCategory] = useState('Semua')
  const session = useSession()
  const [fillteredMeals, setFillteredMeals] = useState([])
  const loadData = async() =>{
    const response = await axios.get("http://localhost:3000/api/meal")
    setFillteredMeals(response.data)
}
useEffect(()=>{
  loadData()
},[])
  function hapusdata(id){
    if(window.confirm('Apakah Anda Yakin Inggin Menghapus Data Ini ?')){
      axios.delete(`http://localhost:3000/api/meal/${id}`)
      setTimeout(() => loadData(), 500)
  }
  }
  useEffect(()=>{
    const fillterMeals = () => {
      setFillteredMeals(() =>{
        if(activeCategory){
          if(activeCategory === 'Semua'){
            return meals
          }
          return [...meals].filter((meal)=>meal.category === activeCategory)
        }
      })
    }
    activeCategory && fillterMeals()
  },[activeCategory])
  return (
    <div className={classes.container}>
    <div className={classes.wrapper}>
    <div className={classes.titles}>
    <h5>Ambil Sesuatu Yang Enak</h5>
    <h2>Makanan Dan Kategori</h2>
    </div>
    <div className={classes.categories}>
    <span onClick={()=>setActiveCategory('Semua')} className={`${classes.category} ${activeCategory === 'Semua' ? classes.active : ''}`}>
    Semua
    </span>
    <span onClick={()=>setActiveCategory('Makanan Berat')} className={`${classes.category} ${activeCategory === 'Makanan Berat' ? classes.active : ''}`}>
    Makanan Berat
    </span>
    <span onClick={()=>setActiveCategory('Makanan Ringan')} className={`${classes.category} ${activeCategory === 'Makanan Ringan' ? classes.active : ''}`}>
    Makanan Ringan
    </span>
    <span onClick={()=>setActiveCategory('Minuman')} className={`${classes.category} ${activeCategory === 'Minuman' ? classes.active : ''}`}>
    Minuman
    </span>
    </div>
    {
      fillteredMeals?.length > 0
      ? <div className={classes.meals}>
      {fillteredMeals?.map((meal)=>(
        <Link href={`/makanan/${meal?._id}`} key={meal?._id} className={classes.meal}>
        <div className={classes.imgContainer}>
        <Image src={meal?.image} width='250' height='250' />
        </div>
        <div className={classes.mealData}>
        <h4>{meal?.title}</h4>
        <span>Rp{meal?.price}</span>
        </div>
        </Link>
      ))}
      {session.status !== 'authenticated'
      ?(
        <>

        </>
      )
      :
      <>
      {meals?.map((item)=>(
        <button className={classes.tombol} onClick={() => hapusdata(item?._id)}>
      <FcFullTrash size={20} />
      </button>
      ))}
      </>
    }
      </div>
      : <h2 className={classes.noMeal}>Tidak Ada {activeCategory} Yang Tersedia</h2>
    }
    </div>
    </div>
  )
}

export default Catalog