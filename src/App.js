import './App.scss';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';

import LanguageSwitcher from './components/shared/LanguageSwitcher/LanguageSwitcher';
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="language-container">
          <LanguageSwitcher />
        </div>
        <Hero />
      </header>
      <About/>
      <Skills/>
      <Experience/>
    </div>
  );
}

export default App;
