import React, { FC, useEffect, useRef } from 'react';
import Particles from 'react-tsparticles';
import { particlesOptions } from '../../constants';
import lastNameImage from '../../../assets/lastname.png';
import firstNameImage from '../../../assets/lastname.png';
import './styles.scss';

const IntroScreenAnimation: FC = () => {
  const occupationTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const occupationElement = occupationTextRef.current;

    if (occupationElement) {
      const occupationChars = occupationElement.innerHTML.split('');

      occupationChars.forEach(item => {
        const letter = document.createTextNode(item);
        const span = document.createElement('span');
        span.appendChild(letter);
        occupationElement.appendChild(span);
      });
    }
  }, [occupationTextRef]);

  return (
    <div className="intro-screen-animation">
      <Particles
        id="stars-background"
        className="intro-screen-animation__stars-background"
        options={particlesOptions}
      />
      <section className="animated-intro-section">
        <img
          alt="firstname"
          src={firstNameImage}
          className="animated-intro-section__firstname-img"
        />
        <h2
          ref={occupationTextRef}
          className="animated-intro-section__occupation-text"
          id="occupation">
          Full Stack Engineer
        </h2>
        <img
          src={lastNameImage}
          alt="lastname"
          className="animated-intro-section__lastname-img"
        />
      </section>
    </div>
  );
};

export default IntroScreenAnimation;
