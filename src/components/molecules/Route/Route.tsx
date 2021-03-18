import React, { FC, memo } from 'react';
import { RouteProps } from './types';
import isEqual from 'react-fast-compare';
import Optional from '../../atoms/Optional';
import { useRedirect } from '../../../hooks';
import { Route as RouterRoute, Redirect } from 'react-router-dom';

const Route: FC<RouteProps> = memo(({ component: Component, admin, ...rest }) => {
  const redirectPath = useRedirect(admin);

  return (
    <RouterRoute
      {...rest}
      render={props => (
        <>
          <Optional renderIf={!redirectPath}>
            <Component {...props} />
          </Optional>
          <Optional renderIf={redirectPath}>
            <Redirect
              to={{
                state: { from: props.location },
                pathname: redirectPath as string,
              }}
            />
          </Optional>
        </>
      )}
    />
  );
}, isEqual);

export default Route;
