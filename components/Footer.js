import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function FooterPage() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events 2021</p>
      <Link href="/About">About This Project</Link>
    </footer>
  );
}
