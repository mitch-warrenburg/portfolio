import React, { FC, useCallback, MouseEventHandler, useEffect } from 'react';
import List from '../../atoms/List';
import Panel from '../../atoms/Panel';
import styled from 'styled-components';
import Header from '../../atoms/Header';
import ListItem from '../../atoms/ListItem';
import { useHistory } from 'react-router-dom';
import { HomeButton } from '../../atoms/HomeButton';
import { useSelector, useDispatch } from 'react-redux';
import { State, ChatState } from '../../../store/types';
import PageTemplate from '../../templates/PageTemplate';
import StatusIndicator from '../../atoms/StatusIndicator';
import ChatMessenger from '../../organisms/ChatMessenger';
import { TOKEN_AUTH_ERROR_MSG } from '../../../globalConstants';
import { setCurrentChatUserId } from '../../../store/state/chatSlice';

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const RowCell = styled.div`
  display: flex;
  max-height: 100%;
  align-items: center;
  justify-content: space-between;
  color: white;
  cursor: pointer;
  font-size: 14px;
`;

const ContentPanes = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: stretch;
  justify-content: flex-start;
  pointer-events: initial;

  @media screen and (max-width: 606px) {
    flex-direction: column;
  }
`;

const UserListPane = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 300px;
  max-width: 360px;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  border-right: 1px solid ${({ theme }) => theme.colors.divider};

  @media screen and (max-width: 606px) {
    max-width: 100%;
  }
`;

const ChatPane = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ChatContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(249, 250, 251, 0.3);
  background: rgba(36, 39, 59, 0.6);
  border-radius: 20px;
  transition: ease-in-out 300ms;
`;

const AdminPage: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { users, error, currentChatUserId } = useSelector<State, ChatState>(
    ({ chat }) => chat
  );
  const userList = Object.values(users);

  const userRowClickHandler: MouseEventHandler<HTMLLIElement> = useCallback(({ target }) => {
    const { id } = target as HTMLLIElement;
    dispatch(setCurrentChatUserId(id));
  }, []);

  useEffect(() => {
    if (!currentChatUserId && userList.length) {
      dispatch(setCurrentChatUserId(userList[0].userId));
    }
  }, [users, currentChatUserId]);

  useEffect(() => {
    if (error === TOKEN_AUTH_ERROR_MSG) {
      history.push('/home');
    }
  }, [error]);

  const homeButtonClickHandler = useCallback(() => history.push('/home'), []);

  return (
    <PageTemplate>
      <Panel>
        <Header>
          <HeaderContent>
            <span>Chat Sessions</span>
            <HomeButton type="button" onClick={homeButtonClickHandler} />
          </HeaderContent>
        </Header>
        <ContentPanes>
          <UserListPane>
            <List>
              {userList.map(({ username, connected, userId }) => (
                <ListItem
                  cursorPointer
                  id={userId}
                  key={userId}
                  onClick={userRowClickHandler}
                  selected={userId === currentChatUserId}>
                  <RowCell>{username}</RowCell>
                  <RowCell>
                    <StatusIndicator status={connected ? 'success' : 'error'}>
                      {connected ? 'Online' : 'offline'}
                    </StatusIndicator>
                  </RowCell>
                </ListItem>
              ))}
            </List>
          </UserListPane>
          <ChatPane>
            <ChatContainer>
              <ChatMessenger isChatOpen isChatMinimized={false} />
            </ChatContainer>
          </ChatPane>
        </ContentPanes>
      </Panel>
    </PageTemplate>
  );
};

export default AdminPage;
