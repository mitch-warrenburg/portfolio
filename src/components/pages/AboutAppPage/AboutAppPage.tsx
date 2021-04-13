import React, { FC } from 'react';
import styled from 'styled-components';
import { LoremIpsum } from 'lorem-ipsum';
import Section from '../../molecules/Section';
import { useScrollTop } from '../../../hooks';
import architectureImage from '../../../assets/architecture.png';

const Container = styled.div`
  margin: 0 16px;
`;

const Header = styled.h4`
  margin: 16px 0;
  color: white;
`;

const IntroText = styled.p`
  margin: 16px 0;
  letter-spacing: normal;
  text-align: justify;
`;

const ArticleText = styled.div`
  text-align: justify;
  text-align-all: center;

  :last-of-type {
    margin-bottom: 54px;
  }
`;

const ArchitectureImage = styled.img`
  width: 100%;
  margin: 0 auto;
  letter-spacing: normal;
`;

const TextList = styled.ul`
  margin-left: 32px;
`;

const AboutAppPage: FC = () => {
  useScrollTop();

  return (
    <Section header="What's under the Hood?">
      <Container>
        <IntroText>
          <p>
            &nbsp;&nbsp;The goal of this app is, primarily, to showcase the use of various
            technologies across throughout the stack. It was important to build something that
            looks, feels and performs like a web application - as opposed to a cheap
            wordpress-like experience. And to touch as many technologies as possible along the
            way, the app is a bit <i>over-engineered</i> by design.
          </p>
        </IntroText>
        <Header>Technologies Used</Header>
        <TextList>
          <li>Spring Boot</li>
          <li>NodeJS</li>
          <li>ReactJS</li>
          <li>nginx</li>
          <li>Postgresql</li>
          <li>Redis</li>
          <li>Firebase Auth</li>
          <li>Firebase Analytics</li>
          <li>Kubernetes (GKE)</li>
        </TextList>
        <Header>Application Architecture</Header>
        <ArchitectureImage alt="architecture" src={architectureImage} />
        <Header>Workflow</Header>
        <p>
          &nbsp;&nbsp;This app utilizes public github repositories alongside GCP Cloud Build.
          Updates to the main branch for each repository triggers a build for the given
          microservice. Each of the three repositories define a deployable Docker image. Each
          Dockerfile has a builder image which uses node or gradle to build the application
          prior to building the final image artifact. This makes the "build" part of Cloud
          Build manifests quite simple - as they only need to trigger the build and inject the
          configured configuration and secrets. Cloud Build then publishes each image to the
          Google Container Registry (GCR) to reference in the subsequent Kubernetes deployment.
          Finally, Cloud Build uses the Kubernetes manifests defined in each repository with
          the freshly built image to trigger a rolling update to my GKE environment. With this
          cloud-based ci process pipeline, deployments are as simple as <code>git push</code>.
        </p>
        <Header>The Frontend</Header>
        <p>
          &nbsp;&nbsp;The frontend is a React SPA written in Typescript. It is built using
          ParcelJS and the bundle is deployed and served from an Nginx Docker image. All http
          requests are therefore sent to the origin thanks to Nginx reverse proxy capabilities.
          The following libraries were used to implement the features, including chat, email
          and scheduling:
        </p>
        <TextList>
          <li>ReduxJS</li>
          <li>Redux Persist</li>
          <li>Firebase JS Client Library</li>
          <li>Fullcalendar</li>
          <li>Axios</li>
          <li>Socket.io</li>
          <li>CK Editor</li>
          <li>Styled Components</li>
          <li>SASS</li>
        </TextList>
        <Header>The Backend - Spring Boot Auth, Email and Scheduling API Server</Header>
        <p>
          &nbsp;&nbsp;The Spring Boot microservice handles securing sessions and exposes CRUD
          (postgresql-backed) API's for user management and scheduling. Since there are no
          Firebase integrations with Spring security, the implementation is entirely custom.
          Session http-only cookies are used to identify users and authenticate requests to
          protected endpoints. The Email feature simply interfaces with Sendgrid's API services.
          GCP's Secret Manager Spring Cloud integration is used to configure secrets in
          realtime. The following are notable libraries utilized for this service:
        </p>
        <TextList>
          <li>Spring Cloud Google Secret Manager</li>
          <li>Actuator</li>
          <li>Firebase Admin Client</li>
          <li>Sendgrid Java Client</li>
          <li>Spring Data JPA</li>
          <li>Spring Security</li>
        </TextList>
        <Header>The Backend - NodeJS Chat Server</Header>
        <p>
          &nbsp;&nbsp;The nodeJS server exposes a websocket-based API for the chat feature. It
          integrates with the Spring Boot server to facilitate secure connections for users whom
          have authenticated. It also exposes some restful endpoints for administrative
          purposes and server health checks. The libraries used for this microservice are:
          <TextList>
            <li>Socket.io</li>
            <li>Express</li>
            <li>Firebase Admin Client</li>
            <li>Sendgrid Java Client</li>
            <li>Redis (Node Driver)</li>
            <li>Axios</li>
          </TextList>
        </p>
      </Container>
    </Section>
  );
};

export default AboutAppPage;
