import { useEffect } from 'react';

export const UserToLocalStorage = (userState, setUserState) => {
  useEffect(() => {
    const userStateData = JSON.parse(localStorage.getItem('userState'));

    if (userStateData) {
      setUserState(userStateData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(userState));
  }, [userState]);
};
