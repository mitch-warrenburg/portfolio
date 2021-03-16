import React, { FC } from 'react';
import { AvatarProps } from './types';
import styled from 'styled-components';

const AvatarContainer = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  top: 8px;
  left: 9px;
  padding: 0;
  width: 38px;
  height: 38px;
  overflow: hidden;
  margin-right: 12px;
  border-radius: 30px;
  border: 2px solid rgba(255, 255, 255, 0.24);

  img {
    width: 100%;
    object-fit: cover;
    text-align: center;
  }
`;

const Avatar: FC<AvatarProps> = ({ image, ...props }) => {
  return (
    <AvatarContainer {...props}>
      <img src={image} alt="profile-avatar" />
    </AvatarContainer>
  );
};

export default Avatar;
