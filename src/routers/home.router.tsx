import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import TodoList from 'pages/TodoList';
import NotFoundPage from 'pages/NotFoundPage';

export const HomeRouter: FC = () => (
	<Routes>
		<Route path='/' element={<TodoList />} />

		<Route path="*" element={<NotFoundPage />} />
	</Routes>
);
