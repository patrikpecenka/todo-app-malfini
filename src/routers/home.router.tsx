import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFoundPage from 'pages/NotFoundPage';
import TodoList from 'pages/TodoList';
import { TempLayout } from 'pages/AppShellPage';

export const HomeRouter: FC = () => (
	<Routes>
		<Route path='/' element={<TempLayout />}>
			<Route index element={<TodoList />} />
			<Route path="*" element={<NotFoundPage />} />
		</Route>
	</Routes>
);
