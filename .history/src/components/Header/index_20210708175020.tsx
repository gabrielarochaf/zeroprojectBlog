import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.Container}>
      <img alt="logo" src="assets/Logo.svg" />
    </header>
  )
}
