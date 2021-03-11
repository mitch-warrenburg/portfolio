import React, { FC, useEffect } from 'react';
import Particles from 'react-tsparticles';
import lastNameImage from './assets/lastname.png';
import firstNameImage from './assets/firstname.png';

const App: FC = () => {
  useEffect(() => {
    /*
      The following JS takes in the byline and splits it into letters, each one wrapped in a span.
      We need to create the spans as nodes, we can't just add them to the HTML using innerHTML, as to do so would mean the CSS won't affect the span because it doesn't recognise the tag as existing.
      It's an old problem we run into time and again.
    */

    const byline = document.getElementById('occupation'); // Find the H2

    console.log(byline);

    if (byline) {
      const bylineText = byline.innerHTML; // Get the content of the H2
      const bylineArr = bylineText.split(''); // Split content into array
      byline.innerHTML = ''; // Empty current content

      let span;
      let letter;

      for (let i = 0; i < bylineArr.length; i++) {
        // Loop for every letter
        span = document.createElement('span'); // Create a <span> element
        letter = document.createTextNode(bylineArr[i]); // Create the letter
        if (bylineArr[i] == ' ') {
          // If the letter is a space...
          byline.appendChild(letter); // ...Add the space without a span
        } else {
          span.appendChild(letter); // Add the letter to the span
          byline.appendChild(span); // Add the span to the h2
        }
      }
    }
  }, []);

  return (
    <div className="intro-screen">
      <Particles
        id="stars-background"
        className="intro-screen__stars-background"
        init={(main: any) => console.log('main:', main)}
        loaded={(container: any) => console.log('loaded:', container)}
        options={{
          particles: {
            number: {
              value: 550,
              density: {
                enable: true,
                value_area: 790,
              },
            },
            color: {
              value: '#ffffff',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
              polygon: {
                nb_sides: 5,
              },
            },
            opacity: {
              value: 0.75,
              random: true,
              anim: {
                enable: true,
                speed: 0.2,
                opacity_min: 0.2,
                sync: false,
              },
            },
            size: {
              value: 2,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: '#ffffff',
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.1,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'bubble',
              },
              onclick: {
                enable: true,
                mode: 'push',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 83.91608391608392,
                size: 1,
                duration: 3,
                opacity: 1,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
      />
      <section className="animated-intro-section">
        <img
          src={firstNameImage}
          alt="firstname"
          className="animated-intro-section__firstname-img"
        />
        <h2 className="animated-intro-section__occupation-text" id="occupation">
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

App.defaultProps = {};

export default App;
