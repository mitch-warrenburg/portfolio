import React, { FC } from 'react';
import { DialogProps } from './types';
import Modal from '../../atoms/Modal';
import styled from 'styled-components';
import Overlay from '../../atoms/Overlay';
import IconButton from '../../atoms/IconButton';

const CloseButtonContainer = styled.div`
  display: flex;
  overflow: visible;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  padding: 4px;
  pointer-events: all;

  button {
    margin: -18px -16px 0 0;

    > svg {
      z-index: 5;
      color: ${({ theme }) => theme.colors.font.header};
      font-size: 24px;
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  background: rgba(16, 18, 27, 0.6);
  border-radius: 14px;

  @media screen and (max-width: 512px), screen and (max-height: 600px) {
    border: none;
    border-radius: 0;
  }
`;

const Dialog: FC<DialogProps> = ({
  active,
  children,
  onClickAway,
  onClickClose,
  ...props
}) => {
  return (
    <>
      <Overlay active={active} />
      <Modal {...props} active={active} onClickAway={onClickAway}>
        <Wrapper>
          <CloseButtonContainer>
            <IconButton icon="times-circle" onClick={onClickClose} />
          </CloseButtonContainer>
          {children}
        </Wrapper>
      </Modal>
    </>
  );
};

Dialog.defaultProps = {
  active: false,
  onClickAway: () => {},
};

export default Dialog;
