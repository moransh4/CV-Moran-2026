import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.scss';
import profileImg from '../../assets/me1.jpg';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();

  // אפקטים: תזוזה 
  const imageY = useTransform(scrollY, [0, 1000], [0, 800]); // Adjust the range as needed

  return (
    <motion.section className={styles.hero}>
      <motion.div className={styles.imageContainer} style={{ y: imageY }}>
        <img src={profileImg} alt="הפורטרט שלי" className={styles.image} />
      </motion.div>

      <div className={styles.content}>
        <h1 className={styles.title}>{t('hero.title')}</h1>
        <p className={styles.subtitle}>{t('hero.subtitle')}</p>
      </div>
    </motion.section>
  );
};

export default Hero;
