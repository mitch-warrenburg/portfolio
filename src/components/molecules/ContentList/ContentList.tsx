import React, { FC } from 'react';
import List from '../../atoms/List';
import { ContentListProps } from './types';
import ListItem from '../../atoms/ListItem';

const ContentList: FC<ContentListProps> = ({ children, ...props }) => {
  return (
    <List {...props}>
      {React.Children.toArray(children).map((child, index) => (
        <ListItem key={index}>{child}</ListItem>
      ))}
    </List>
  );
};

export default ContentList;
