import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../public/languagePractice.css';

AOS.init({
 duration: 1200,
 easing: 'ease-in-out-back'
});

const LanguagePractice = (props) => {
  console.log('this is props inside LanguagePractice', props)
  const vocab = props.location.state.vocab

  return (
    <div id="language-practice-page">
    {/* <div data-aos="fade-up-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"> Ready to practice? Scroll down! Prompts will be on the right and answers on the left!
    </div> */}
    <div className="item item--primary"
     data-aos="fade-left"
     data-aos-anchor="#trigger-right">
       <span>How would you greet someone?</span>
    </div>

    <div className="item item--secondary"
        data-aos="fade-right"
        data-aos-anchor="#trigger-left">
        {vocab['Hello!']}
    </div>

    <div className="item item--primary"
     data-aos="fade-left"
     data-aos-anchor="#trigger-right">
      How day you say "How are you?"
    </div>

    <div className="item item--secondary"
        data-aos="fade-right"
        data-aos-anchor="#trigger-left">
      {vocab['How are you?']}
    </div>

    <div className="item item--primary"
     data-aos="fade-left"
     data-aos-anchor="#trigger-right">
      "I am fine.""
    </div>

    <div className="item item--secondary"
        data-aos="fade-right"
        data-aos-anchor="#trigger-left">
      {vocab['I am fine.']}
    </div>

    <div className="item item--primary"
     data-aos="fade-left"
     data-aos-anchor="#trigger-right">
      How do you thank someone?
    </div>

    <div className="item item--secondary"
        data-aos="fade-right"
        data-aos-anchor="#trigger-left">
      {vocab['Thank you.']}
    </div>

    <div className="item item--primary"
     data-aos="fade-left"
     data-aos-anchor="#trigger-right">
      {vocab['What is your name?']}
    </div>

    <div className="item item--secondary"
        data-aos="fade-right"
        data-aos-anchor="#trigger-left">
      {vocab['My name is ___.']}
    </div>

    <div className="item item--primary"
     data-aos="fade-left"
     data-aos-anchor="#trigger-right">
      "Goodbye!""
    </div>

    <div className="item item--secondary"
        data-aos="fade-right"
        data-aos-anchor="#trigger-left">
      {vocab['Goodbye!']}
    </div>

    <div className="item"> Ready to practice? Scroll down! Prompts will be on the right and answers on the left! </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right">
      <span>trigger right</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right">
      <span>trigger right</span>
    </div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right">
      <span>trigger right</span>
    </div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right">
      <span>trigger right</span>
    </div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right">
      <span>trigger right</span>
    </div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right">
      <span>trigger right</span>
    </div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right">
      <span>trigger right</span>
    </div>
    <div className="item"> END </div>
  </div>
  )
}

export default LanguagePractice
