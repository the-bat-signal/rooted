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
     data-aos-anchor="#trigger-right-hello">
       {vocab['Hello!']}
    </div>

    <div className="item item--secondary"
        data-aos="fade-right"
        data-aos-anchor="#trigger-left-hello">
        How would you greet someone?
    </div>

    <div className="item item--primary"
     data-aos="fade-up-left"
     data-aos-anchor="#trigger-right-how-are-you">
      {vocab['How are you?']}
    </div>

    <div className="item item--secondary"
      data-aos="fade-up-right"
      data-aos-anchor="#trigger-left-how-are-you">
      How do you say "How are you?"
    </div>

    <div className="item item--primary"
     data-aos="fade-down-left"
     data-aos-anchor="#trigger-right-im-fine">
      {vocab['I am fine.']}
    </div>

    <div className="item item--secondary"
        data-aos="fade-down-right"
        data-aos-anchor="#trigger-left-im-fine">
      "I am fine."
    </div>

    <div className="item item--primary"
     data-aos="flip-left"
     data-aos-anchor="#trigger-right-thanks">
      {vocab['Thank you.']}
    </div>

    <div className="item item--secondary"
        data-aos="flip-right"
        data-aos-anchor="#trigger-left-thanks">
      How do you thank someone?
    </div>

    <div className="item item--primary"
     data-aos="flip-up"
     data-aos-anchor="#trigger-right-name">
      {vocab['My name is ___.']}
    </div>

    <div className="item item--secondary"
        data-aos="flip-down"
        data-aos-anchor="#trigger-left-name">
      {vocab['What is your name?']}
    </div>

    <div className="item item--primary"
     data-aos="zoom-in"
     data-aos-anchor="#trigger-right-bye">
      {vocab['Goodbye!']}
    </div>

    <div className="item item--secondary"
        data-aos="zoom-in-up"
        data-aos-anchor="#trigger-left-bye">
      "Goodbye!"
    </div>

    <div className="item"> Ready to practice? Scroll down! Prompts will be on the right and answers on the left! </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-hello">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-hello">
      <span>trigger right</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-how-are-you">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-how-are-you">
      <span>trigger right</span>
    </div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-im-fine">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-im-fine">
      <span>trigger right</span>
    </div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-thanks">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-thanks">
      <span>trigger right</span>
    </div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-name">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-name">
      <span>trigger right</span>
    </div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-bye">
      <span>trigger left</span>
    </div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-bye">
      <span>trigger right</span>
    </div>
    <div className="item"> END </div>
  </div>
  )
}

export default LanguagePractice
