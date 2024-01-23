import { modals } from '@mantine/modals';
import { getFormattedTime, FormattedTime } from 'utils/time';
import { TodoModel } from 'components/AddItemModal';
import { db } from 'services/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDoc, getDocs } from "firebase/firestore";

export interface ItemsProps {
  title: string;
  id: string;
  checkbox: boolean;
  description: string;
  time: string;
  position: number;
  userId: string;
}

const useTodoFunctions = () => {
  //CREATES NEW TODO ITEM AND STORES IT INSIDE 
  const createTodoItem = async (title: string, description: string, time: string, userId: string) => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const position = querySnapshot.size + 1;
    const newTodo: ItemsProps = {
      title,
      id: crypto.randomUUID(),
      description,
      position: position,
      time,
      checkbox: false,
      userId,
    };
    try {
      await addDoc(collection(db, "todos"), newTodo);
    } catch (error) {
      console.log("Create item error:", error)
    }
  };

  //DELETES TODO ITEM BASED ON ID
  const deleteTodoItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id))
    } catch (error) {
      console.log("Delete item error:", error)
    }
  };

  //RETURNS EDITED ITEM
  const editTodoItem = async (id: string, newTitle: string, newDescription: string) => {
    try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        title: newTitle,
        description: newDescription,
      });
    } catch (error) {
      console.log("Retrieve item for editing error:", error);
    }
  };

  //GETS ITEM TO EDIT BASED ON ID, TITLE AND DESCRIPTION CAN BE CHANGED
  const getItemForEdit = async (id: string) => {
    try {
      const todoDoc = await getDoc(doc(db, 'todos', id));

      if (todoDoc.exists()) {
        const itemToEdit = { id: todoDoc.id, ...todoDoc.data() };

        modals.openContextModal({
          modal: 'addItem',
          title: 'Edit Item',
          innerProps: {
            editTodo: itemToEdit,
            onSelect: async (formData: TodoModel) => {
              await editTodoItem(id, formData.title, formData.description);
            },
          },
        });
      }
    } catch (error) {
      console.log("Updating item error:", error);
    }

  };

  //TOGGLE CHECKBOX TO TRUE OR FALSE
  const toggleCheckbox = async (id: string, newValue: boolean) => {
    try {
      const { formattedTime }: FormattedTime = getFormattedTime();
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        checkbox: newValue,
        time: (newValue ? formattedTime : '')
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };


  return {
    toggleCheckbox,
    createTodoItem,
    deleteTodoItem,
    editTodoItem,
    getItemForEdit,
  };
};

export default useTodoFunctions;