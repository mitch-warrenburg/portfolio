import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import Section from '../../molecules/Section';
import { useScrollTop } from '../../../hooks';
import IconLink from '../../molecules/IconLink';

const Container = styled.div`
  margin: 0 16px;
`;

const Header = styled.h4`
  margin: 32px 0 0 0;
  color: white;
`;

const IntroText = styled.p`
  margin: 16px 0;
  letter-spacing: normal;
  text-align: justify;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const AboutMePage: FC = () => {
  const theme = useTheme();

  useScrollTop();

  return (
    <Section header="About Me">
      <Container>
        <Header>Overview</Header>
        <IntroText>
          I'm a Full-stack software engineer with a passion for building awesome software with
          the latest technologies. My skill set covers all layers of the stack, including Java,
          Kotlin, Spring, Javascript, Typescript, Node.js, React, Redux, Docker, CSS/SCSS,
          Python, SQL, MongoDB, RabbitMQ, Kafka, GCP, Kubernetes, AWS and various CI/CD
          technologies.
        </IntroText>
        <Header>Links</Header>
        <LinksContainer>
          <IconLink
            text="My Linkedin Profile"
            href="https://www.linkedin.com/in/mitchww/"
            icon={{ icon: 'linkedin', prefix: 'fab', color: 'rgb(10, 102, 194)', size: 'lg' }}
          />
          <IconLink
            newTab={false}
            text="Meeting Availability"
            href="/app/scheduling"
            icon={{ icon: 'calendar', color: theme.colors.theme.success, size: 'lg' }}
          />
          <IconLink
            newTab={false}
            text="Contact Me"
            href="/app/contact"
            icon={{ icon: 'comments', color: theme.colors.theme.pending, size: 'lg' }}
          />
        </LinksContainer>
        <Header>Source Code</Header>
        <LinksContainer>
          <IconLink
            text="React Frontend"
            href="https://github.com/mitch-warrenburg/portfolio"
            icon={{ icon: 'github', prefix: 'fab', color: 'white', size: 'lg' }}
          />
          <IconLink
            text=" NodeJS Chat Server"
            href="https://github.com/mitch-warrenburg/portfolio-chat-server"
            icon={{ icon: 'github', prefix: 'fab', color: 'white', size: 'lg' }}
          />
          <IconLink
            text="Spring Boot Auth, Email and Scheduling API Server"
            href="https://github.com/mitch-warrenburg/portfolio-server"
            icon={{ icon: 'github', prefix: 'fab', color: 'white', size: 'lg' }}
          />
        </LinksContainer>
      </Container>
    </Section>
  );
};

export default AboutMePage;
