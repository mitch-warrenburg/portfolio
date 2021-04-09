import React, { FC, useCallback } from 'react';
import AuthForm from '../AuthForm';
import Modal from '../../atoms/Modal';
import Overlay from '../../atoms/Overlay';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { modalAuthFormMessages } from './constants';
import useAuthState from '../../../hooks/useAuthState';

const AuthFormModal: FC = () => {
  const { toggleAuthFormModal } = useAuthState();
  const isAuthFormModalOpen = useSelector<RootState, boolean>(
    ({ ui }) => ui.isAuthFormModalOpen
  );

  const closeButtonClickHandler = useCallback(() => {
    toggleAuthFormModal(false);
  }, []);

  return (
    <>
      <Overlay active={isAuthFormModalOpen} />
      <Modal active={isAuthFormModalOpen}>
        <AuthForm
          formMessages={modalAuthFormMessages}
          onClickClose={closeButtonClickHandler}
        />
      </Modal>
    </>
  );
};

export default AuthFormModal;
