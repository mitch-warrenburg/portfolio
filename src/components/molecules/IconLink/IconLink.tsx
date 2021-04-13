import React, { FC } from 'react';
import styled from 'styled-components';
import { IconLinkProps } from './types';
import Optional from '../../atoms/Optional';
import Icon, { IconProps } from '../../atoms/Icon';

const Container = styled.div`
  display: flex;
  margin-top: 12px;
`;

const Link = styled.a`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.theme.primary};
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`;

const Image = styled.img`
  width: 14px;
  height: 14px;
`;

const IconLink: FC<IconLinkProps> = ({ img, icon, text, href, newTab = true, ...props }) => {
  return (
    <Container {...props}>
      <Optional renderIf={icon}>
        <Icon {...(icon as IconProps)} />
      </Optional>
      <Optional renderIf={img}>
        <Image alt="text" src={img} />
      </Optional>
      <Link target={newTab ? '_blank' : undefined} href={href}>
        {text}
      </Link>
    </Container>
  );
};

export default IconLink;
