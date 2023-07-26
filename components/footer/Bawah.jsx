import React from 'react'
import classes from './footer.module.css'

function Bawah() {
  return (
    <footer className={classes.footer}>
    <div className={classes.wrapper}>
    <div className={classes.col}>
    <h2>About the App</h2>
    <p>Ini Aplikasi</p>
    </div>
    <div className={classes.col}>
    <h2>Contacts</h2>
    <span>Phone + 123 456 789</span>
    <span>Youtube: esjavascript</span>
    <span>GitHub: Manuhutu344</span>
    </div>
    <div className={classes.col}>
    <h2>Location</h2>
    <span>Continent: Asia</span>
    <span>Country: Indonesia</span>
    <span>Current Location: Amban Pantai</span>
    </div>
    </div>
    </footer>
  )
}

export default Bawah