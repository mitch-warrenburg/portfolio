import React from 'react';
import { ModalProps } from './types';
import styled from 'styled-components';

const Modal = styled.div<ModalProps>`
  position: fixed;
  z-index: 10;
  top: 35%;
  left: calc(50% - 250px);
  display: flex;
  width: 500px;
  flex-direction: column;
  padding: 30px 40px;
  background-color: ${({ theme }) => theme.colors.background.modal};
  border-radius: 6px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
  opacity: ${({ active }) => (active ? 1 : 0)};
  overflow-y: auto;
  transform: (translate(-50%, -50%));
  transition: all 0.3s;
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  white-space: normal;

  @media screen and (max-width: 570px) {
    width: 100%;
  }
`;

Modal.defaultProps = {
  active: false,
};

export default Modal;
