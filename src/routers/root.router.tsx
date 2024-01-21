import { FC } from 'react';

import { useAuthStore } from '../store/auth.store';

import { AuthRouter } from './auth.router';
import { HomeRouter } from './home.router';

export const RootRouter: FC = () => {
  const { userData } = useAuthStore();

  if (userData === null) {
    return (
      <AuthRouter />
    );
  }

  return (
    <HomeRouter />
  );
};
