import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.Container}>
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="logo" className={styles.logo} />
        </a>
      </Link>
    </header>
  );
}