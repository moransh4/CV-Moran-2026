import SectionTitle from '../shared/SectionTitle/SectionTitle';
import Button from '../shared/Buttons/Button';
import { useTranslation } from 'react-i18next'
import { motion} from 'framer-motion';
import styles from './About.module.scss';
const About = () => {
    const { t } = useTranslation()

  return (
    <motion.section className={styles.about}>
      <SectionTitle>{t('about.title')}</SectionTitle>
      <p>{t('about.description')}</p>
      <Button href="/cv.pdf" target="_blank">{t('hero.cv-button')}</Button>
    </motion.section>
  )
}

export default About;
