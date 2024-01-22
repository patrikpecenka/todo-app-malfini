import { FC } from 'react';

import { AppShell, Stack } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export const TempLayout: FC = () => (
  <AppShell>
    <Stack justify="flex-start">
      <Outlet />
    </Stack>
  </AppShell>
);