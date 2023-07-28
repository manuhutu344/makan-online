import React from 'react'
import classes from './navbar.module.css'
import {AiOutlineLogout, AiOutlineMail} from 'react-icons/ai'
import Link from 'next/link'
import { signIn, useSession, signOut } from 'next-auth/react'

function Navbar() {
  const session = useSession()
  return (
    <div className={classes.container}>
    <div className={classes.wrapper}>
    <Link href='/' className={classes.left}>
    <h2>Makan Online</h2>
    </Link>
    <ul className={classes.center}>
    <li className={classes.listItem}>Home</li>
    <li className={classes.listItem}>About</li>
    <li className={classes.listItem}>Konatak Kami</li>
    <li className={classes.listItem}>unggulan</li>
    </ul>
    <div className={classes.right}>
    {session.status !== 'authenticated' 
    ?(
      <>
    <AiOutlineMail size={30} />
    <button onClick={() => signIn()} className={classes.signIn}>Sign In</button>
      </>
    )
  :
  <>
  <div className={classes.logout} onClick={()=>signOut()}>
  Logout <AiOutlineLogout />
  </div>
  <Link className={classes.addMeal} href='/tambah'>
  Tambah Makanan
  </Link>
  </>
}
    </div>
    </div>
    </div>
  )
}

export default Navbar