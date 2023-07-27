import React from 'react'
import classes from './navbar.module.css'
import {AiOutlineMail} from 'react-icons/ai'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

function Navbar() {
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
    <AiOutlineMail size={30} />
    <button onClick={() => signIn()} className={classes.signIn}>Sign In</button>
    </div>
    </div>
    </div>
  )
}

export default Navbar