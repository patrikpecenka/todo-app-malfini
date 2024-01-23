import { useEffect, FC, useState } from "react";
import TodoItem from "../components/TodoItem";
import "../styles/Todo.css"
import { Button, Flex, Box, Group, Input, Container, Text, Title, useMantineColorScheme, useComputedColorScheme, ActionIcon } from '@mantine/core';
import { modals } from '@mantine/modals';
import { TodoModel } from "../components/AddItemModal";
import useTodoFunctions from "utils/todoLogic";
import Icon from '@mdi/react';
import { mdiMagnify, mdiPlus } from '@mdi/js';
import { db } from "services/firebase"
import { query, collection, onSnapshot, orderBy, where } from "firebase/firestore"
import { ItemsProps } from "utils/todoLogic";
import { useAuthStore } from "store/auth.store";
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from "../styles/SchemeIcon.module.css"
import ExitButtonModal from "components/ExitButtonModal";
import SwitchButton from "components/SwitchButton";
import { useTranslation } from "react-i18next";

const TodoList: FC = () => {
  const {
    toggleCheckbox,
    createTodoItem,
    deleteTodoItem,
    getItemForEdit,
  } = useTodoFunctions();
  const { t } = useTranslation("translation")

  const [visibilityFilter, setVisibilityFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [todoItems, setTodoItems] = useState<ItemsProps[]>([]);

  const { userData, logout } = useAuthStore();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  const iconPlus = <Icon path={mdiPlus} size={1} />

  const handleTogle = (isChecked: boolean) => {
    !isChecked
  }
  //FILTERING ITEMS , USED FOR BUTTONS
  const filteredItems = todoItems.filter(item => {
    if (visibilityFilter === "All") return true;
    if (visibilityFilter === "Active") return !item.checkbox;
    if (visibilityFilter === "Complete") return item.checkbox;
    return false;
  }).filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  //AT FIRST LOAD GET ALL ITEMS FROM DB + AT DB CHANGE RELOAD
  useEffect(() => {
    const q = query(collection(db, "todos"), where('userId', '==', userData?.uid), orderBy('position'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: ItemsProps[] = []
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id } as ItemsProps);
      });
      setTodoItems(items)
    })
    return () => unsubscribe()
  }, [])

  return (
    <Flex direction="column" align="center" w="100%" h="100vh" mt={30}>
      <Box maw="580px">
        <Flex w="100%" justify="space-between" pl={20} pr={20}>
          <Text variant="gradient" gradient={{ from: 'rgba(108, 170, 171, 1)', to: 'rgba(121, 179, 158, 1)', deg: 51 }} size="58px">T o d o.</Text>
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
            <SwitchButton onToggle={handleTogle} />
            <ExitButtonModal confirm={logout} />
          </Group>
        </Flex>

        <Container className='todo-wrapper' mt="30" pb="20" w="100%">
          <Button
            justify="left"
            fullWidth
            leftSection={iconPlus}
            rightSection={<span />}
            w="95%"
            mt={20}
            size="lg"
            variant="outline"
            onClick={() =>
              modals.openContextModal({
                modal: "addItem",
                title: t("add_item_modal.title"),
                innerProps: {
                  onSelect: (formData: TodoModel) => {
                    createTodoItem(formData.title, formData.description, formData.time, formData.userId)
                  }
                }
              })
            }
          >
            {t("add_item_modal.button_title")}
          </Button>
          <Flex w="100%" p={20} justify="center" >
            <Group gap={15}>
              {["All", "Active", "Complete"].map(filter => (
                <Button
                  key={filter}
                  onClick={() => setVisibilityFilter(filter)}
                  variant={visibilityFilter === filter ? "color" : "light"}
                  color="cyan"
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
              <Input.Wrapper label={t("sort_buttons.search_label")} w="100%">
                <Input
                  placeholder={t("sort_buttons.search_ph")}
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
          <Title order={3} mt={10}>
            {t("sort_buttons.todo_listed")} {filteredItems.length}
          </Title>
        </Container >
      </Box>

    </Flex >
  )
}

export default TodoList