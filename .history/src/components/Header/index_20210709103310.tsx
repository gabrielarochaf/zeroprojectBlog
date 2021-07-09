import styles from './header.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.Container}>
      <Link href="/">
        <a>
          <img alt="logo" src="assets/Logo.svg" />
        </a>
      </Link>
    </header>
  )
}
