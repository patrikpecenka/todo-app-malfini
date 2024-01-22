import { useEffect, FC, useState } from "react";
import TodoItem from "../components/TodoItem";
import "../styles/Todo.css"
import { Button, Flex, Box, Group, Input, Container, Text, Title, useMantineColorScheme, useComputedColorScheme, ActionIcon } from '@mantine/core';
import { modals } from '@mantine/modals';
import { TodoModel } from "../components/Modal";
import useTodoFunctions from "utils/todoLogic";
import Icon from '@mdi/react';
import { mdiMagnify, mdiLogout, mdiPlus } from '@mdi/js';
import { db } from "services/firebase"
import { query, collection, onSnapshot, orderBy, where } from "firebase/firestore"
import { ItemsProps } from "utils/todoLogic";
import { useAuthStore } from "store/auth.store";
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from "../styles/SchemeIcon.module.css"


const TodoList: FC = () => {
  const {
    toggleCheckbox,
    createTodoItem,
    deleteTodoItem,
    getItemForEdit,
  } = useTodoFunctions();

  const iconPlus = <Icon path={mdiPlus} size={1} />

  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [todoItems, setTodoItems] = useState<ItemsProps[]>([]);

  const { userData, logout } = useAuthStore();

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  //FILTERING ITEMS , USED FOR BUTTONS
  const filteredItems = todoItems.filter(item => {
    if (visibilityFilter === 'all') return true;
    if (visibilityFilter === 'active') return !item.checkbox;
    if (visibilityFilter === 'completed') return item.checkbox;
    return false;
  }).filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  //AT FIRST LOAD GET ALL ITEMS FROM DB + AT DB CHANGE RELOAD
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
    <Flex direction="column" align="center" w="100%" h="100vh" mt={30}>
      <Box maw="700">
        <Flex w="100%" justify="space-between">
          <Text c="grey" size="60px">TODO</Text>
          <Group>
            <ActionIcon
              onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
              variant="default"
              size="xl"
              aria-label="Toggle color scheme"
            >
              <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
              <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
            <Button
              w="auto"
              onClick={logout} >
              <Icon path={mdiLogout} size={1} />
            </Button>
          </Group>
        </Flex>

        <Container className='todo-wrapper' mt="30" pb="20" w="100%">
          <Button
            justify="left"
            fullWidth
            leftSection={iconPlus}
            rightSection={<span />}
            w="100%"
            mt={20}
            size="lg"
            variant="outline"
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
                  variant={visibilityFilter === filter ? "color" : "light"}
                  color="cyan"
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
              <Input.Wrapper label="Search listing" w="100%">
                <Input
                  placeholder="write sum"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftSection={<Icon path={mdiMagnify} size={1} />}
                >
                </Input>
              </Input.Wrapper>
            </Group>
          </Flex>
          <Container w="100%">
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
          <Title order={2} mt={10}>
            {"Todos: " + filteredItems.length}
          </Title>
        </Container >
      </Box>

    </Flex >
  )
}

{/* <Button bg="#AAD7D9" onClick={logout} >
  <Icon path={mdiLogout} size={1} />
</Button> */}

{/* <Input.Wrapper label="Search listing" w="100%">
  <Input
    placeholder="write sum"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    leftSection={<Icon path={mdiMagnify} size={1} />}
  >
  </Input>
</Input.Wrapper> */}

/* <Flex w="100%" h="100vh" direction="row" bg="white" m={0} p={0}>
        <Box w={500} m={0} p={0} style={{ borderRight: "solid 2px grey" }} pt={30}>
          <Flex direction="column" justify="start" align="center" ml={20} mr={20} h="100%" gap={30}>
            <Flex justify="space-between" align="center" w="100%">
              <Title order={1} size="50px">TODO</Title>

            </Flex>
            <Combobox >
              <Input.Wrapper label="Search listing" w="100%">
                <Input
                  placeholder="write sum"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftSection={<Icon path={mdiMagnify} size={1} />}
                >
                </Input>
              </Input.Wrapper>
            </Combobox>
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
              </Group>
            </Flex>
          </Flex>
        </Box>

        <Flex className='todo-wrapper' w="40%" p="xl" h="100vh" bg="white">
          <Button
            justify="space-between"
            fullWidth
            rightSection={icon}
            leftSection={<span />}
            variant="outline"
            mt="md"

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
            Press to add new listing
          </Button>
          <Flex justify="center" direction="column" >
            {filteredItems.map((item, index) => (
              <Box key={index} m={10}>
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
          </Flex>
          <Box >
            <Title order={4}> {"Number of items: " + filteredItems.length}</Title>
          </Box>
        </Flex>
      </Flex> */
export default TodoList