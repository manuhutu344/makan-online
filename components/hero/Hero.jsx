import React from 'react'
import classes from './hero.module.css'
import Image from 'next/image'
import womanEating from '../../public/assets/womaneating.jpg'

function Hero() {
  return (
    <div className={classes.container}>
    <div className={classes.wrapper}>
    <div className={classes.left}>
    <h2>Perut Kenyang<br />Buat Bahagia</h2>
    <h5>Kami Dapat Membantu Anda Dengan Pengalaman Dengan Memberikan Anda<br />Dengan Makanan Luar Biasa Makanan Berat, Makanan Ringan, Minuman,<br />Semua Bisa Anda Dapatkan Disini</h5>
    <div className={classes.buttons}>
    <button className={classes.orderNow}>
    Order Sekarang
    </button>
    <button className={classes.seeMore}>
    Lihat Lebih
    </button>
    </div>
    <div className={classes.disclaimer}>
    Kami Tutup Setiap Hari Libur
    </div>
    </div>
    <div className={classes.right}>
    <Image src={womanEating} alt='' />
    </div>
    </div>
    </div>
  )
}

export default Hero