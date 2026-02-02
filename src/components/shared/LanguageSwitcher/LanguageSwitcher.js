import { useTranslation } from 'react-i18next'
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation()
  
    const toggleLanguage = () => {
      const newLang = i18n.language === 'he' ? 'en' : 'he'
      i18n.changeLanguage(newLang)
    }
  
    return (
      <button className={styles['lang-btn']} onClick={toggleLanguage}>
        {i18n.language === 'he' ? 'English' : 'עברית'}
      </button>
    )
  }
  
  export default LanguageSwitcher
