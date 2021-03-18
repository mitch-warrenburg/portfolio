import React, { FC, useCallback, MouseEventHandler } from 'react';
import List from '../../atoms/List';
import Panel from '../../atoms/Panel';
import styled from 'styled-components';
import Header from '../../atoms/Header';
import { useSelector, useDispatch } from 'react-redux';
import ListItem from '../../atoms/ListItem';
import { State, ChatState } from '../../../store/types';
import PageTemplate from '../../templates/PageTemplate';
import StatusIndicator from '../../atoms/StatusIndicator';
import ChatMessenger from '../../organisms/ChatMessenger';
import { setCurrentChatUserId } from '../../../store/state/chatSlice';
import Icon from '../../atoms/Icon';

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  button {
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    background: transparent;
    justify-content: center;
    transition: 250ms ease-in-out;
    color: ${({ theme }) => theme.colors.font.inactive};

    &:hover {
      transform: scale(1.1, 1.1);
      color: ${({ theme }) => theme.colors.font.primary};
    }
  }
`;

const RowCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 14px;
  cursor: pointer;
  max-height: 100%;
`;

const ContentPanes = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  pointer-events: initial;

  @media screen and (max-width: 606px) {
    flex-direction: column;
  }
`;

const UserListPane = styled.div`
  position: relative;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  max-width: 360px;
  min-width: 300px;
  justify-content: flex-start;
  border-right: 1px solid ${({ theme }) => theme.colors.divider};

  @media screen and (max-width: 606px) {
    max-width: 100%;
  }
`;

const ChatPane = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: hidden;
  background: rgba(36, 39, 59, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: ease-in-out 300ms;
  border: 1px solid rgba(249, 250, 251, 0.3);
  border-radius: 20px;
`;

const AdminPage: FC = () => {
  const dispatch = useDispatch();
  const { users, currentChatUserId } = useSelector<State, ChatState>(({ chat }) => chat);
  const userList = Object.values(users);

  const userRowClickHandler: MouseEventHandler<HTMLLIElement> = useCallback(({ target }) => {
    const { id } = target as HTMLLIElement;
    dispatch(setCurrentChatUserId(id));
  }, []);

  return (
    <PageTemplate>
      <Panel>
        <Header>
          <HeaderContent>
            <span>Chat Sessions</span>
            <button type="button">
              <Icon icon="home" size="2x" />
            </button>
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
