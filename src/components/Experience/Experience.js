import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import sanityClient from '../../sanityClient';
import SectionTitle from '../shared/SectionTitle/SectionTitle';
import styles from './Experience.module.scss';

const Experience = () => {
  const { i18n, t } = useTranslation();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        console.log('🔄 Fetching experiences from Sanity...');
        const query = `*[_type == "experience"] | order(startDate desc) {
          _id,
          position,
          company,
          location,
          startDate,
          endDate,
          currentlyWorking,
          description
        }`;
        const data = await sanityClient.fetch(query);
        console.log('✅ Experiences fetched:', data);
        console.log('📊 Total experiences:', data.length);
        setExperiences(data);
      } catch (error) {
        console.error('❌ Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: i18n.language === 'he' ? 50 : -50,
      y: 20 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  const getLanguageField = (obj) => {
    if (!obj) return '';
    return i18n.language === 'he' ? obj.he || obj.en : obj.en || obj.he;
  };

  const renderDescription = (description) => {
    if (!description) return null;
    const lang = i18n.language === 'he' ? description.he : description.en;
    
    if (!Array.isArray(lang)) return <p>{lang}</p>;

    const elements = [];
    let currentList = [];
    let currentListType = null;

    lang.forEach((block, idx) => {
      if (block._type !== 'block') return;

      const text = block.children?.map((child) => child.text).join('') || '';
      
      // Handle list items
      if (block.listItem === 'bullet' || block.listItem === 'number') {
        if (currentListType !== block.listItem) {
          // Flush previous list
          if (currentList.length > 0) {
            if (currentListType === 'bullet') {
              elements.push(<ul key={`list-${idx}`}>{currentList}</ul>);
            } else {
              elements.push(<ol key={`list-${idx}`}>{currentList}</ol>);
            }
          }
          currentList = [];
          currentListType = block.listItem;
        }
        currentList.push(<li key={`item-${idx}`}>{text}</li>);
      } else {
        // Flush previous list before adding non-list items
        if (currentList.length > 0) {
          if (currentListType === 'bullet') {
            elements.push(<ul key={`list-${idx}`}>{currentList}</ul>);
          } else {
            elements.push(<ol key={`list-${idx}`}>{currentList}</ol>);
          }
          currentList = [];
          currentListType = null;
        }

        // Add non-list items
        if (block.style === 'h3') {
          elements.push(<h3 key={idx}>{text}</h3>);
        } else if (block.style === 'h4') {
          elements.push(<h4 key={idx}>{text}</h4>);
        } else if (text.trim()) {
          elements.push(<p key={idx}>{text}</p>);
        }
      }
    });

    // Flush any remaining list
    if (currentList.length > 0) {
      if (currentListType === 'bullet') {
        elements.push(<ul key="final-list">{currentList}</ul>);
      } else {
        elements.push(<ol key="final-list">{currentList}</ol>);
      }
    }

    return elements;
  };

  if (loading) {
    return (
      <motion.section
        className={styles.experience}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.loading}>Loading experiences...</div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className={styles.experience}
      dir={i18n.language === 'he' ? 'rtl' : 'ltr'}
    >
    <SectionTitle>{t('experience.title')}</SectionTitle>


      <motion.div className={styles.timeline} data-dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
        {experiences.map((exp, index) => (
          <motion.div
            key={exp._id}
            className={styles.timelineItem}
          >
            <motion.div
              className={styles.timelineDot}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className={styles.card}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 40px rgba(20, 184, 166, 0.2)',
              }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <h3 className={styles.position}>
                    {getLanguageField(exp.position)}
                  </h3>
                  <p className={styles.company}>
                    {getLanguageField(exp.company)}
                  </p>
                  <p className={styles.location}>
                    📍 {getLanguageField(exp.location)}
                  </p>
                </div>

                <div className={styles.dateRange}>
                  <span className={styles.year}>{exp.startDate}</span>
                  <span className={styles.separator}>—</span>
                  <span className={styles.year}>
                    {exp.currentlyWorking ? (
                      <span className={styles.current}>Present</span>
                    ) : (
                      exp.endDate || 'N/A'
                    )}
                  </span>
                </div>
              </div>

              {exp.description && (
                <motion.div
                  className={styles.description}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {renderDescription(exp.description)}
                </motion.div>
              )}

              {exp.currentlyWorking && (
                <motion.div
                  className={styles.badge}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  Currently Working
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Experience;
