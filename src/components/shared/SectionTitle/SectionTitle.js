import styles from './SectionTitle.module.scss';
import { motion } from 'framer-motion';

const SectionTitle = ({ children , isWhiteUnderline }) => {
  return (
    <motion.h2
      className={styles.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
      <span className={`${styles.underline} ${isWhiteUnderline ? styles.whiteUnderline : ''}`}></span>
    </motion.h2>
  )
}

export default SectionTitle
