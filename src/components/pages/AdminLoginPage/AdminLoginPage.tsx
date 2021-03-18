import React, { FC } from 'react';
import styled from 'styled-components';
import { PanelProps } from '../../atoms/Panel';
import PageTemplate from '../../templates/PageTemplate';
import AdminLoginForm from '../../organisms/AdminLoginForm';

const Container = styled.div<PanelProps>`
  top: 25%;
  position: fixed;
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  padding: 30px;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const Header = styled.h2`
  font-size: 20px;
  text-align: center;
  width: 100%;
  padding-bottom: 30px;
`;

const AdminLoginPage: FC = () => {
  return (
    <PageTemplate>
      <Container>
        <Header>Admin Login</Header>
        <AdminLoginForm />
      </Container>
    </PageTemplate>
  );
};

export default AdminLoginPage;
