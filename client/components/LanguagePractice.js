import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const LanguagePractice = (props) => {
  return (
    <div data-aos="fade-up-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"> Ready to practice? Scroll down! </div>
  )
}

export default LanguagePractice
