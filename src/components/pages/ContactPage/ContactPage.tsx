import React, { FC, useEffect } from 'react';
import { ContactPageProps } from './types';
import Section from '../../molecules/Section';
import styled, { useTheme } from 'styled-components';
import Notification from '../../organisms/Notification';
import EmailSection from '../../organisms/EmailSection';

const Page = styled.div`
  margin: 0 16px 36px 16px;
`;

const ContactPage: FC<ContactPageProps> = ({ openChatFn, openSchedulerFn, ...props }) => {
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
