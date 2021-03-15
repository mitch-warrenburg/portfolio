import React, { FC } from 'react';
import { DialogProps } from './types';
import Modal from '../../atoms/Modal';
import Overlay from '../../atoms/Overlay';
import styled from 'styled-components';
import Optional from '../../atoms/Optional';
import Icon from '../../atoms/Icon';
import { IconName } from '@fortawesome/fontawesome-common-types';

const Title = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.font.primary};
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
