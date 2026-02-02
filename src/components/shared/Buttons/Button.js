import styles from './Button.module.scss';

const Button = ({ children, href }) => {
  return (
    <a href={href}  className={styles.button}>
      {children}
    </a>
  )
}

export default Button
