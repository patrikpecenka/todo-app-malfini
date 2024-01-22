import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFoundPage from '../pages/NotFoundPage';
import SignUp from 'services/SignUp';
import { Login } from 'services/Login';
import { TempLayout } from 'pages/AppShellPage';

export const AuthRouter: FC = () => (
	<Routes>
		<Route path='/' element={<TempLayout />}>
			<Route path='/' element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="*" element={<NotFoundPage />} />
		</Route>
	</Routes >
);
