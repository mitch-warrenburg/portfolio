import React, { FC } from 'react';
import { ContactPageProps } from './types';
import Section from '../../molecules/Section';
import styled, { useTheme } from 'styled-components';
import Notification from '../../organisms/Notification';
import EmailSection from '../../organisms/EmailSection';

const Page = styled.div`
  margin-bottom: 36px;
`;

const ContactPage: FC<ContactPageProps> = ({ openChatFn, openSchedulerFn, ...props }) => {
  const theme = useTheme();

  return (
    <Page {...props}>
      <Section header="Chat">
        <Notification
          themeColor={theme.colors.theme.primary}
          button={{
            transparent: true,
            onClick: openChatFn,
            text: 'Open Messenger',
          }}
          icon={{
            size: 'lg',
            icon: 'comments',
          }}
          message="Chat Now!"
        />
      </Section>
      <Section header="Schedule a Chat">
        <Notification
          themeColor={theme.colors.theme.pending}
          button={{
            transparent: true,
            onClick: openSchedulerFn,
            text: 'Check Availability',
          }}
          icon={{
            size: 'lg',
            icon: 'calendar-check',
          }}
          message="Schedule"
        />
      </Section>
      <EmailSection />
    </Page>
  );
};

export default ContactPage;
