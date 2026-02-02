import React, {useState , useEffect} from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.scss';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../shared/SectionTitle/SectionTitle';
import sanityClient from '../../sanityClient';

const skills = [
    'HTML',
    'CSS',
    'Sass',
    'Bootstrap',
    'scss',
    'JavaScript',
    'React',
    'Node.js',
    'Express',
    'MongoDB',
    'Git',
    'Redux',
    'TypeScript',
  ];
  

const Skills = () => {
  const { t } = useTranslation();
  const [skills, setSkills] = useState([]);

    useEffect(() => {
    // שאילתה ל-Sanity
    sanityClient
      .fetch(`*[_type == "skill"]{name}`)  // מביא כל הskills מ-Sanity
      .then(data => {
        setSkills(data) // מניח שהשדה של השם נקרא 'name'
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <motion.section className={styles.skills}>
        <SectionTitle isWhiteUnderline={true} >{t('skills.title')}</SectionTitle>
        <div className={styles.skillsContainer}>
            {skills.map((skill, index) => (
                <motion.div
                key={index}
                className={styles.skillBox}
                initial={{ scale: 0, opacity: 0 }} // Start small and invisible
                whileInView={{ scale: 1, opacity: 1 }} // Animate to full size and visible
                transition={{duration: 0.5 ,  delay: index * 0.1 , ease: 'easeInOut'}}
                viewport={{ once: false }} // Trigger animation only once when in view
                >
                <p className={styles.skillText}>{skill.name}</p>
                </motion.div>
            ))}
        </div>
    </motion.section>
  );
};

export default Skills;
