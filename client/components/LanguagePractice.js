import React, {useEffect} from 'react'
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

  useEffect(() => {
  window.scrollTo(0, 0)
}, [])

  return (
    <div id="language-practice-page">
    <div id='scroll-down'>
      <h1>Scroll Down</h1>
      <img src='https://content.invisioncic.com/p289038/monthly_2020_05/arrow-down.gif.8d9aec7b8f92f2a50a1a64fce1733f3a.gif' id="scrolling"/>
    </div>
    <div className="item item--hello-right"
     data-aos="fade-left"
     data-aos-anchor="#trigger-right-hello">
       {vocab['Hello!']}
    </div>

    <div className="item item--hello-left"
        data-aos="fade-right"
        data-aos-anchor="#trigger-left-hello">
        How would you greet someone?
    </div>

    <div className="item item--how-right"
     data-aos="fade-up-left"
     data-aos-anchor="#trigger-right-how-are-you">
      {vocab['How are you?']}
    </div>

    <div className="item item--how-left"
      data-aos="fade-up-right"
      data-aos-anchor="#trigger-left-how-are-you">
      How do you say "How are you?"
    </div>

    <div className="item item--fine-right"
     data-aos="fade-down-left"
     data-aos-anchor="#trigger-right-im-fine">
      {vocab['I am fine.']}
    </div>

    <div className="item item--fine-left"
        data-aos="fade-down-right"
        data-aos-anchor="#trigger-left-im-fine">
      "I am fine."
    </div>

    <div className="item item--thanks-right"
     data-aos="flip-left"
     data-aos-anchor="#trigger-right-thanks">
      {vocab['Thank you.']}
    </div>

    <div className="item item--thanks-left"
      data-aos="flip-right"
      data-aos-anchor="#trigger-left-thanks">
      How do you thank someone?
    </div>

    <div className="item item--name-right"
     data-aos="flip-up"
     data-aos-anchor="#trigger-right-name">
      {vocab['My name is ___.']}
    </div>

    <div className="item item--name-left"
        data-aos="flip-down"
        data-aos-anchor="#trigger-left-name">
      {vocab['What is your name?']}
    </div>

    <div className="item item--bye-right"
     data-aos="zoom-in"
     data-aos-anchor="#trigger-right-bye">
      {vocab['Goodbye!']}
    </div>

    <div className="item item--bye-left"
        data-aos="zoom-in-up"
        data-aos-anchor="#trigger-left-bye">
      "Goodbye!"
    </div>

    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-hello"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-hello"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-how-are-you"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-how-are-you"></div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-im-fine"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-im-fine"></div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-thanks"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-thanks"></div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-name"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-name"></div>
     <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-left-bye"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item" id="trigger-right-bye"></div>
    <div className="item"></div>
  </div>
  )
}

export default LanguagePractice
