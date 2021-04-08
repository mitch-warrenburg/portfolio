import React, { FC } from 'react';
import { ModalProps } from './types';
import styled from 'styled-components';

const Container = styled.div<ModalProps>`
  position: fixed;
  z-index: 4;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ active }) => (active ? 1 : 0)};
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
`;

const Content = styled.div`
  display: flex;
  width: 400px;
  height: 420px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.modal};
  border-radius: 14px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  transform: (translate(-50%, -50%));
  transition: all 0.3s;
  white-space: normal;

  @media screen and (max-width: 720px), screen and (max-height: 600px) {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 0;
  }
`;

const Modal: FC<ModalProps> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Content>{children}</Content>
    </Container>
  );
};

Modal.defaultProps = {
  active: false,
};

export default Modal;
