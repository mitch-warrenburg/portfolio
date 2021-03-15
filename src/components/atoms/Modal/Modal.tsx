import React from 'react';
import { ModalProps } from './types';
import styled from 'styled-components';

const Modal = styled.div<ModalProps>`
  position: fixed;
  padding: 30px 40px;
  top: 35%;
  left: calc(50% - 250px);
  transform: (translate(-50%, -50%));
  overflow-y: auto;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
  transition: all 0.3s;
  z-index: 10;
  width: 500px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  white-space: normal;
  background-color: ${({ theme }) => theme.colors.background.modal};
  opacity: ${({ active }) => (active ? 1 : 0)};
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  

  @media screen and (max-width: 570px) {
    width: 100%;
  }
`;

Modal.defaultProps = {
  active: false,
};

export default Modal;
