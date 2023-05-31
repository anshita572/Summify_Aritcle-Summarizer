import Hero from './components/Hero';
import Demo from './components/Demo';
// import { Theme } from './dark_mode';
import './App.css';
const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient'/>
      </div>
      <div className='app'>
        <Hero/>
        <Demo/>
        {/* <Theme /> */}
      </div>
    </main>
  )
}

export default App