import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { PanelProps } from '../../atoms/Panel';
import styled, { useTheme } from 'styled-components';
import PageTemplate from '../../templates/PageTemplate';
import AdminLoginForm from '../../organisms/AdminLoginForm';
import { RoundIconButton } from '../../atoms/RoundIconButton';

const Container = styled.div<PanelProps>`
  position: fixed;
  top: 25%;
  display: flex;
  min-width: 300px;
  flex-direction: column;
  align-self: center;
  padding: 20px;
  border: 1px solid rgb(255, 255, 255, 0.5);
  background: ${({ theme }) => theme.colors.background.menuHover};
  border-radius: 14px;
  justify-self: center;
`;

const Header = styled.h2`
  width: 100%;
  margin-bottom: 50px;
  font-size: 20px;
  text-align: center;
`;

const HomeButtonWrapper = styled.div`
  position: fixed;
  top: 32px;
  right: 32px;
`;

const AdminLoginPage: FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const homeButtonClickHandler = useCallback(() => history.push('/app'), []);

  return (
    <PageTemplate>
      <HomeButtonWrapper>
        <RoundIconButton
          icon="home"
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
