// import React from "react";
// import { logo } from '../assets';
import my_logo from '../assets/my_logo.png';
const Hero = () => {
  return (
   <header className='w-full flex
   justify-center items-center flex-col'>
    <nav className="flex justify-between items-center w-full mb-10 pt-3 ">
      {/* <img src={logo} alt='sumz_logo' className='w-28 object-contain'/> */}
      <img src={my_logo} alt="My Image" />
      <button
      type="button"
      onClick={()=>window.open('https://github.com/anshita572/DSA_Updated/tree/main/AI_summarizer')}
      className="black_btn"
      >GitHub</button>
    </nav>
    <h1 className='head_text'>
    Effortless Article Summarization  <br className='max-md:hidden'/>
      <span
      className='orange_gradient'
      > with OpenAI GPT-4</span>
    </h1>
    <h2 className='desc'>Streamline your reading experience with Summify, an open-source article summarizer that condenses lengthy articles into clear and concise summaries.</h2>
   </header>
  )
}

export default Hero