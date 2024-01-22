import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFoundPage from 'pages/NotFoundPage';
import TodoList from 'pages/TodoList';

export const HomeRouter: FC = () => (
	<Routes>
		<Route path='/' element={<TodoList />} />

		<Route path="*" element={<NotFoundPage />} />
	</Routes>
);
