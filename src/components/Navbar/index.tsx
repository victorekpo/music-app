import { Links } from "@/components/Navbar/Links";
import styles from './navbar.module.css';

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Music App</div>
      <div><Links /></div>
    </div>
  );
};