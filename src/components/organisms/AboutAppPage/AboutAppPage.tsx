import React, { FC } from 'react';
import styled from 'styled-components';
import { LoremIpsum } from 'lorem-ipsum';
import Section from '../../molecules/Section';
import architectureImage from '../../../assets/architecture.png';

const Header = styled.h4`
  margin: 24px 0;
  color: white;
`;

const IntroText = styled.p`
  margin: 16px 0;
  letter-spacing: normal;
  text-align: justify;
`;

const ArticleText = styled.div`
  margin-bottom: 32px;
  text-align: justify;
  text-align-all: center;

  :first-of-type {
    margin-top: 32px;
  }
`;

const ArchitectureImage = styled.img`
  width: 80%;
  margin: 0 auto;
  letter-spacing: normal;
`;

const lorem = new LoremIpsum();

const AboutAppPage: FC = () => {
  return (
    <Section header="What's under the Hood?">
      <IntroText>{lorem.generateParagraphs(1)}</IntroText>
      <Header>Application Architecture</Header>
      <ArchitectureImage alt="architecture" src={architectureImage} />
      <ArticleText>{lorem.generateParagraphs(2)}</ArticleText>
      <ArticleText>{lorem.generateParagraphs(4)}</ArticleText>
      <ArticleText>{lorem.generateParagraphs(3)}</ArticleText>
      <ArticleText>{lorem.generateParagraphs(2)}</ArticleText>
    </Section>
  );
};

export default AboutAppPage;
