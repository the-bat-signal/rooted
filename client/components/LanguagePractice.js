import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../public/languagePractice.css';

AOS.init({
 duration: 1200
});

const LanguagePractice = (props) => {
  return (
    <div id="language-practice-page">
    <div data-aos="fade-up-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"> Ready to practice? Scroll down!
    </div>
    <div class="item item--primary"
     data-aos="fade-left"
     data-aos-anchor="#trigger-right">
      RIGHT
    </div>

    <div class="item item--secondary"
        data-aos="fade-right"
        data-aos-anchor="#trigger-left">
      LEFT
    </div>

    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item" id="trigger-left">
      5
      <span>trigger left</span>
    </div>
    <div class="item">6</div>
    <div class="item">7</div>
    <div class="item" id="trigger-right">
      8
      <span>trigger right</span>
    </div>
    <div class="item">9</div>
    <div class="item">10</div>
    <div class="item">11</div>
    <div class="item">12</div>
  </div>
  )
}

export default LanguagePractice
