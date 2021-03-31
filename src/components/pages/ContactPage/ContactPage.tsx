import React, { FC } from 'react';
import { ContactPageProps } from './types';
import { useTheme } from 'styled-components';
import Section from '../../molecules/Section';
import Notification from '../../organisms/Notification';
import EmailSection from '../../organisms/EmailSection';

const ContactPage: FC<ContactPageProps> = ({ openChatFn, ...props }) => {
  const theme = useTheme();

  return (
    <div {...props}>
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
      <EmailSection />
    </div>
  );
};

export default ContactPage;
