
import { useState } from 'react';
import { modals } from '@mantine/modals';
import { getFormattedTime, FormattedTime } from 'utils/time';
import { TodoModel } from 'components/Modal';

export interface ItemsProps {
  title: string;
  id: string;
  checkbox: boolean;
  description: string;
  time: string;
}

export const useTodoFunctions = () => {
  const [todoItems, setTodoItems] = useState<ItemsProps[]>([]);
  const { formattedTime }: FormattedTime = getFormattedTime();

  //CREATES NEW TODO ITEM AND STORES IT INSIDE 
  const createTodoItem = (title: string, description: string) => {
    const newTodo: ItemsProps = {
      title,
      id: crypto.randomUUID(),
      description,
      time: formattedTime,
      checkbox: false,
    };

    setTodoItems([...todoItems, newTodo]);
    localStorage.setItem('todoList', JSON.stringify([...todoItems, newTodo]));
  };

  //DELETES TODO ITEM BASED ON ID
  const deleteTodoItem = (id: string) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));

    const localItems = JSON.parse(localStorage.getItem('todoList') as string);
    const filteredItems = localItems.filter((item: { id: string }) => item.id !== id);
    localStorage.setItem('todoList', JSON.stringify(filteredItems));
  };

  //RETURNS EDITED ITEM
  const editTodoItem = (id: string, newTitle: string, newDescription: string) => {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: newTitle,
          description: newDescription,
        };
      }
      return item;
    });

    localStorage.setItem('todoList', JSON.stringify(updatedItems));
    setTodoItems(updatedItems);
  };

  //GETS ITEM TO EDIT BASED ON ID, TITLE AND DESCRIPTION CAN BE CHANGED
  const getItemForEdit = (id: string) => {
    const itemToEdit = todoItems.find((item) => item.id === id);
    if (itemToEdit) {
      modals.openContextModal({
        modal: 'addItem',
        title: 'Edit Item',
        innerProps: {
          editTodo: itemToEdit,
          onSelect: (formData: TodoModel) => {
            editTodoItem(id, formData.title, formData.description);
          },
        },
      });
    }
  };

  //TOGGLE CHECKBOX TO TRUE OR FALSE
  const toggleCheckbox = (id: string) => {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checkbox: !item.checkbox,
        };
      }
      return item;
    });

    localStorage.setItem('todoList', JSON.stringify(updatedItems));
    setTodoItems(updatedItems);
  };

  return {
    todoItems,
    toggleCheckbox,
    setTodoItems,
    createTodoItem,
    deleteTodoItem,
    editTodoItem,
    getItemForEdit,
  };
};