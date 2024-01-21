import { useEffect, FC, useState } from "react";
import TodoItem from "../components/TodoItem";
import "../styles/Todo.css"
import { Container, Button, Flex, Box, Combobox, Group, Input, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { TodoModel } from "../components/Modal";
import useTodoFunctions from "utils/todoLogic";
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { db } from "services/firebase"
import { query, collection, onSnapshot, orderBy, where } from "firebase/firestore"
import { ItemsProps } from "utils/todoLogic";
import { useAuthStore } from "store/auth.store";

const TodoList: FC = () => {
  const {
    toggleCheckbox,
    createTodoItem,
    deleteTodoItem,
    getItemForEdit,
  } = useTodoFunctions();

  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [todoItems, setTodoItems] = useState<ItemsProps[]>([]);

  const { userData, logout } = useAuthStore();

  const filteredItems = todoItems.filter(item => {
    if (visibilityFilter === 'all') return true;
    if (visibilityFilter === 'active') return !item.checkbox;
    if (visibilityFilter === 'completed') return item.checkbox;
    return false;
  }).filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const q = query(collection(db, "todos"), where('userId', '==', userData?.uid), orderBy('position'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: any = []
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id })
      });
      setTodoItems(items)
    })
    return () => unsubscribe()
  }, [])

  return (
    <Flex direction="column" align="center" justify="center" w="100%" h="80vh">
      <Box maw="700">
        <Flex w="100%" justify="space-between">
          <Text size="60px">TODO</Text>
          <Button onClick={logout} >
            Sing-out
          </Button>
        </Flex>

        <Container className='todo-wrapper' bg="white" mt="30" pb="20" w="100%">
          <Button
            mt={20}
            size="lg"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan', deg: 201 }}
            onClick={() =>
              modals.openContextModal({
                modal: "addItem",
                title: "Add Item",
                innerProps: {
                  onSelect: (formData: TodoModel) => {
                    createTodoItem(formData.title, formData.description, formData.time, formData.userId)
                  }
                }
              })
            }
          >
            Add new todo
          </Button>
          <Flex w="100%" p={20} justify="center" >
            <Group gap={15}>
              {['all', 'active', 'completed'].map(filter => (
                <Button
                  key={filter}
                  onClick={() => setVisibilityFilter(filter)}
                  variant={visibilityFilter === filter ? "gradient" : "light"}
                  gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
              <Combobox >
                <Input
                  placeholder="write sum"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftSection={<Icon path={mdiMagnify} size={1} />}
                >
                </Input>

              </Combobox>
            </Group>
          </Flex>
          <Container w="100%" pl={50} pr={50}>
            {filteredItems.map((item, index) => (
              <Box key={index}>
                <TodoItem
                  time={item.time}
                  text={item.title}
                  checked={item.checkbox}
                  description={item.description}
                  deleteItem={() => deleteTodoItem(item.id)}
                  editItem={() => getItemForEdit(item.id)}
                  toggleCheckbox={() => toggleCheckbox(item.id, !item.checkbox)}
                />
              </Box>
            ))}
          </Container>
          {"Number of items: " + filteredItems.length}
        </Container >
      </Box>

    </Flex >
  )
}

export default TodoList