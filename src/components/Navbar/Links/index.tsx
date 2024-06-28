'use client'

import styles from './links.module.css';
import { menuLinks } from './links';
import { NavLink } from "@/components/Navbar/Links/NavLink";
import { useState } from "react";

export const Links = () => {
  const [ open, setOpen ] = useState(false);
  const links = menuLinks;

  const session = true;
  // const isAdmin = true;
  // const adminLink = false;

  return (
    <div className={ styles.container }>
      <div className={ styles.links }>
        { links.map(link => {
          return <NavLink item={ link } key={ link.title }/>
        }) }
        { session ? (
          <>
            {/*{ isAdmin && adminLink && <NavLink item={ { title: "Admin", path: "/admin" } }/> }*/}
            <button className={ styles.logout }>Logout</button>
          </>
        ) : (
          <NavLink item={ { title: "Login", path: "/login" } }/>
        )
        }
      </div>
      <button className={styles.menuButton} onClick = {() => setOpen(!open)}>Menu</button>
      { open && (
          <div className={styles.mobileLinks}>
          {links.map(link =>
            <NavLink item={link} key={link.title} />
          )}
          </div>
        )}
    </div>
  )
};