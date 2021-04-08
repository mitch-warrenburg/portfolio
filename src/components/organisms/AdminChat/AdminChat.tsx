import React, { FC, MouseEventHandler, useCallback, useEffect } from 'react';
import List from '../../atoms/List';
import styled from 'styled-components';
import ListItem from '../../atoms/ListItem';
import ChatMessenger from '../ChatMessenger';
import { useDispatch, useSelector } from 'react-redux';
import { State, ChatState } from '../../../store/types';
import StatusIndicator from '../../atoms/StatusIndicator';
import { setCurrentChatUid, connectToChatServer } from '../../../store/state/chatSlice';

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
  min-height: 300px;
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

const RowCell = styled.div`
  display: flex;
  max-height: 100%;
  align-items: center;
  justify-content: space-between;
  color: white;
  cursor: pointer;
  font-size: 14px;
`;

const AdminChat: FC = () => {
  const dispatch = useDispatch();
  const { users, currentChatUid } = useSelector<State, ChatState>(({ chat }) => chat);
  const userList = Object.values(users);

  const userRowClickHandler: MouseEventHandler<HTMLLIElement> = useCallback(({ target }) => {
    const { id } = target as HTMLLIElement;
    dispatch(setCurrentChatUid(id));
  }, []);

  useEffect(() => {
    if (!currentChatUid && userList.length) {
      dispatch(setCurrentChatUid(userList[0].uid));
    }
  }, [users, currentChatUid]);

  useEffect(() => {
    dispatch(connectToChatServer({}));
  }, []);

  return (
    <ContentPanes>
      <UserListPane>
        <List>
          {userList.map(({ username, connected, uid }) => (
            <ListItem
              cursorPointer
              id={uid}
              key={uid}
              onClick={userRowClickHandler}
              selected={uid === currentChatUid}>
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
  );
};

export default AdminChat;
