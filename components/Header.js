import styles from "../styles/Header.module.css";
import Link from "next/link";
import Search from "./Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Dj Event</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Events</a>
                </Link>
              </li>
              <li>
                <Link href="/accounts/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button onClick={() => logout()} className="btn-secondary btn-icon">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/accounts/login">
                <a className="btn-icon btn-secondary">
                  <FaSignInAlt /> Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
