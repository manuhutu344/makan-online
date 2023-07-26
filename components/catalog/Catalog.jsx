import React, { useEffect, useState } from 'react'
import classes from './catalog.module.css'
import Image from 'next/image'
import Link from 'next/link'

function Catalog({meals = []}) {
  console.log(meals)
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [fillteredMeals, setFillteredMeals] = useState([])
  useEffect(()=>{
    const fillterMeals = () => {
      setFillteredMeals(() =>{
        if(activeCategory){
          if(activeCategory === 'Semua'){
            return meals
          }
          return [...meals].filter((meal)=>meal.kategori === activeCategory)
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
      {fillteredMeals?.map((meal)=>{
        <Link href={`/meal/${meal?._id}`} key={meal?._id} className={classes.meal}>
        <div className={classes.imgContainer}>
        <Image src={meal?.image} width='250' height='250' />
        </div>
        <div className={classes.mealData}>
        <h4>{meal?.judul}</h4>
        <span>
        ${meal?.harga}
        </span>
        </div>
        </Link>
      })}
      </div>
      : <h2 className={classes.noMeal}>Tidak Ada {activeCategory} Yang Tersedia</h2>
    }
    </div>
    </div>
  )
}

export default Catalog