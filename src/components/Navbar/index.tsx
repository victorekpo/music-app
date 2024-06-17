import Link from "next/link";
import { Menu } from "@/components/Menu";
import styles from './navbar.module.css';

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Music App</div>
      {/* Mobile */}
      <Link href="/">Dashboard</Link>
      <Menu/>
    </div>
  )
};