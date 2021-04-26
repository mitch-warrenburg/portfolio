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
        <Header>Why I Code... And Why I Love it</Header>
        <IntroText>
          I love to build stuff. I always have. As far back as I can remember, I’ve had a passion
          for the process of bringing something into existence that didn't exist before. To me,
          there’s nothing more satisfying than the realization that you’ve created something
          that started as nothing more than a mental abstraction - so it’s easy to imagine how
          disappointed I was as a child when I realized that free-style Legoing wasn't a
          feasible career choice.
          <br />
          <br />
          After high school I didn't know what I wanted to do. So I chose the degree that
          everyone picks when they’re clueless: Psychology. When I inevitably decided I needed
          to change course, I made the most uninformed, knee-jerk decision possible. I switched
          to a BS in Software Engineering on a whim. My prerequisites were immediately rendered
          useless. I found myself back at square one. Before long, the combination of
          STEM-related coursework and a full time job led me to feel as though I was burning my
          proverbial candle from both ends. It increasingly felt more like an ill-conceived
          gamble… until the day I wrote code for the first time.
          <br />
          <br />I had 2 programs to write - both of which were due in a matter of hours. I had
          read the assigned materials and felt mildly confident I could muster a solution that
          worked well enough given the time crunch. It wasn't until I began thinking through
          the problem and mentally mapping a path to a solution that it all just… clicked. Just
          like that, I was once again a child digging threw a mountain of legos - carefully
          combing the bricks across the floor and considering my options. Once again, I found
          myself entranced… breaking the problem down into smaller pieces and tackling every
          challenge… Once again I found myself asking, “How do I solve this? How many ways can
          it be done?” And most importantly, “How&nbsp;<i>should</i>&nbsp;it be done?”.
          <br />
          <br />
          An hour later, I was reviewing my completed “Rock, Paper, Scissors” terminal app and
          a python script that rendered geometric shapes to form an image of a snowman with a
          corncob pipe. As I admired my work I had a revelation. I had suddenly recognized that
          this familiar, iterative approach to problem-solving that was so enjoyable as a child
          was essentially a form of the&nbsp;
          <i>engineering design process</i>; and code was the conduit I needed to rediscover
          it. Immediately I was relieved with the certainty that I’d made the right decision. I
          finally knew, without a doubt, that this is what I wanted to do. The best part
          was…&nbsp;<i>I was pretty damn good at it</i>.
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
