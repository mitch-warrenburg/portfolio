import React, { FC, useCallback, useEffect } from 'react';
import Panel from '../../atoms/Panel';
import styled from 'styled-components';
import Header from '../../atoms/Header';
import FlexBox from '../../atoms/FlexBox';
import { useHistory } from 'react-router-dom';
import AdminChat from '../../organisms/AdminChat';
import { useSelector, useDispatch } from 'react-redux';
import { State, ChatState } from '../../../store/types';
import PageTemplate from '../../templates/PageTemplate';
import { adminLogout } from '../../../store/state/userSlice';
import { RoundIconButton } from '../../atoms/RoundIconButton';
import { INVALID_USER_ERROR_MSG } from '../../../globalConstants';

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: normal;

  button {
    margin-left: 16px;
  }

  [data-icon='sign-out-alt'] {
    margin-left: 4px;
  }
`;

const AdminPage: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { error } = useSelector<State, ChatState>(({ chat }) => chat);

  useEffect(() => {
    if (error === INVALID_USER_ERROR_MSG) {
      history.push('/app');
    }
  }, [error]);

  const homeButtonClickHandler = useCallback(() => history.push('/app'), []);
  const logoutButtonClickHandler = useCallback(() => dispatch(adminLogout({})), []);

  return (
    <PageTemplate>
      <Panel>
        <Header>
          <HeaderContent>
            <span>Chat Sessions</span>
            <FlexBox justify="flex-end">
              <RoundIconButton icon="home" onClick={homeButtonClickHandler} />
              <RoundIconButton icon="sign-out-alt" onClick={logoutButtonClickHandler} />
            </FlexBox>
          </HeaderContent>
        </Header>
        <AdminChat />
      </Panel>
    </PageTemplate>
  );
};

export default AdminPage;
