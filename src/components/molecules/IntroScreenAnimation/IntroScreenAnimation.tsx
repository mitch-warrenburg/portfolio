import React, { FC, useEffect, useRef } from 'react';
import lastNameImage from '../../../../assets/lastname.png';
import firstNameImage from '../../../../assets/firstname.png';
import './styles.scss';

// TODO: use styled components

const IntroScreenAnimation: FC = () => {
  const occupationTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const occupationElement = occupationTextRef.current;

    if (occupationElement) {
      const occupationChars = occupationElement.innerHTML.split('');

      occupationElement.innerText = '';

      occupationChars.forEach(item => {
        const letter = document.createTextNode(item);
        const span = document.createElement('span');
        if (item === ' ') {
          occupationElement.appendChild(letter);
        } else {
          span.appendChild(letter);
          occupationElement.appendChild(span);
        }
      });
    }
  }, [occupationTextRef]);

  return (
    <div className="intro-screen-animation">
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
