import React, { FC, useEffect } from 'react';
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
