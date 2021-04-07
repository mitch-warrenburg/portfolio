import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import useEventCallback from './useEventCallback';
import { RootState, UserState } from '../store/types';
import { setAuthFormDraft } from '../store/state/userSlice';
import { setAuthFormStatus, setIsAuthFormModalOpen } from '../store/state/uiSlice';

const useAuthState = () => {
  const dispatch = useDispatch();
  const { uid, username, company, authFormDraft } = useSelector<RootState, UserState>(
    ({ user }) => user
  );

  const isUserFullyAuthenticated = useMemo(() => {
    return !!(uid && username && company);
  }, [uid, username, company]);

  const updateAuthStateStatus = useEventCallback(() => {
    if (authFormDraft.confirmationCode) {
      dispatch(setAuthFormDraft({ confirmationCode: '' }));
    }

    if (isUserFullyAuthenticated) {
      return;
    }

    // if they have authenticated but need to submit userInfo - start them on the userInfo stage
    if (uid && (!username || !company)) {
      dispatch(setAuthFormStatus('userInfo'));
    } else {
      // it should never open to the confirmation code field - so this is the case for everything else
      dispatch(setAuthFormStatus('phoneNumber'));
    }
  });

  const toggleAuthFormModal = useEventCallback((open: boolean) => {
    updateAuthStateStatus();
    dispatch(setIsAuthFormModalOpen(open));
  });

  return {
    toggleAuthFormModal,
    updateAuthStateStatus,
    isUserFullyAuthenticated,
  };
};

export default useAuthState;
