'use client'

import styles from './navbarlink.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = ({ item, setOpen }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      className={
      `${styles.container} ${
        pathName === item.path && styles.active 
        }`
      }
      onClick={() => setOpen(false)}
    >
      {item.title}
    </Link>
  )
};