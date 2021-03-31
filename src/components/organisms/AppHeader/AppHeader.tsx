import React, { FC, MouseEventHandler, useCallback, useState } from 'react';
import Header from '../../atoms/Header';
import { locations } from './constants';
import Tabs from '../../molecules/Tabs';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import IconButton from '../../atoms/IconButton';
import { LOGO } from '../../../globalConstants';
import { History, LocationState } from 'history';
import MobileMenu from '../../molecules/MobileMenu';
import RoundImageButton from '../../atoms/RoundImageButton';

const AppHeader: FC = () => {
  const { pathname } = useLocation();
  const history: History<LocationState> = useHistory();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const clickHandler: MouseEventHandler<HTMLLIElement> = useCallback(event => {
    const { id } = event.target as HTMLLIElement;
    history.push(id);
    closeMenu();
  }, []);

  const homeLogoClickHandler = useCallback(() => history.push('/app'), []);

  return (
    <Header>
      <RoundImageButton src={LOGO} alt="logo" onClick={homeLogoClickHandler} />
      <Tabs tabs={locations} onClickTab={clickHandler} selectedId={pathname} />
      <IconButton icon="bars" size="2x" color="white" onClick={openMenu} />
      <MobileMenu
        items={locations}
        isOpen={isMenuOpen}
        onClickClose={closeMenu}
        onClickItem={clickHandler}
      />
    </Header>
  );
};

export default AppHeader;
