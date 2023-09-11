import styles from './A.module.sass'
import Link from "next/link";

export const A = ({text, href}) => {
  return (
    <Link className={styles.link} href={href}>{text}</Link>
  )
}
