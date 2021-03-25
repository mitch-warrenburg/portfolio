import React, { FC } from 'react';
import { DialogProps } from './types';
import Modal from '../../atoms/Modal';
import Icon from '../../atoms/Icon';
import styled from 'styled-components';
import Overlay from '../../atoms/Overlay';
import Optional from '../../atoms/Optional';

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.font.primary};
  outline: none;
`;

const Dialog: FC<DialogProps> = ({
  active,
  header,
  children,
  onClickClose,
  hasCloseButton,
  ...props
}) => {
  return (
    <>
      <Modal {...props} active={active}>
        <Optional renderIf={header}>
          <Title>
            <div>{header}</div>
            <Optional renderIf={hasCloseButton}>
              <CloseButton onClick={onClickClose}>
                <Icon
                  inverse
                  size="lg"
                  cursor="pointer"
                  icon="times-circle"
                  color="transparent"
                />
              </CloseButton>
            </Optional>
          </Title>
        </Optional>
        {children}
      </Modal>
      <Overlay active={active} />
    </>
  );
};

Dialog.defaultProps = {
  active: false,
  hasCloseButton: true,
};

export default Dialog;
