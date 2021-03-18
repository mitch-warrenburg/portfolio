import { State } from '../store/types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

const useRedirect = (isAdminRoute = false): string | null => {
  const { pathname } = useLocation();
  const path = useSelector<State, string | null>(({ ui }) => (ui.hasRunIntro ? null : '/'));
  const adminPath = useSelector<State, string | null>(({ user }) =>
    user.isAdmin ? null : '/admin/login'
  );

  const redirectRoute = path || (isAdminRoute ? adminPath : null);
  return redirectRoute === pathname ? null : redirectRoute;
};

export default useRedirect;
