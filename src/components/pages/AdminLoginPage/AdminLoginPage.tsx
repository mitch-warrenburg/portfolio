import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { PanelProps } from '../../atoms/Panel';
import { HomeButton } from '../../atoms/HomeButton';
import styled, { useTheme } from 'styled-components';
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
  padding: 20px;
  min-width: 300px;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const Header = styled.h2`
  font-size: 20px;
  text-align: center;
  width: 100%;
  margin-bottom: 50px;
`;

const HomeButtonWrapper = styled.div`
  top: 32px;
  right: 32px;
  position: fixed;
`;

const AdminLoginPage: FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const homeButtonClickHandler = useCallback(() => history.push('/home'), []);

  return (
    <PageTemplate>
      <HomeButtonWrapper>
        <HomeButton
          onClick={homeButtonClickHandler}
          color={theme.colors.font.transparentButton}
        />
      </HomeButtonWrapper>
      <Container>
        <Header>Admin Login</Header>
        <AdminLoginForm />
      </Container>
    </PageTemplate>
  );
};

export default AdminLoginPage;
