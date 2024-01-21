import { useEffect, FC, useState } from "react";
import TodoItem from "./TodoItem";
import "../styles/Todo.css"
import { Container, Button, Flex, Box, Combobox, InputBase, Group } from '@mantine/core';
import { modals } from '@mantine/modals';
import { TodoModel } from "./Modal";
import { ItemsProps, useTodoFunctions } from "utils/functions";


const Todo: FC<ItemsProps> = () => {
  const {
    todoItems,
    setTodoItems,
    toggleCheckbox,
    createTodoItem,
    deleteTodoItem,
    getItemForEdit,
  } = useTodoFunctions();

  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');

  const filteredItems = todoItems.filter(item => {
    if (visibilityFilter === 'all') return true;
    if (visibilityFilter === 'active') return !item.checkbox;
    if (visibilityFilter === 'completed') return item.checkbox;
    return false;
  });

  //on first load check the local storage for any stored items
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("todoList") as string)
    storedItems && setTodoItems(storedItems)
  }, [])

  return (
    <Container className='todo-wrapper' bg="white" maw="700" mt="30" pb="20">
      <h1 className="todo-name">Todo List</h1>
      <div className="input-button-container">
        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 201 }}
          onClick={() =>
            modals.openContextModal({
              modal: "addItem",
              title: "Add Item",
              innerProps: {
                onSelect: (formData: TodoModel) => {
                  createTodoItem(formData.title, formData.description)
                }
              }
            })
          }
        >
          Add new todo
        </Button>
      </div>
      <Box w="100%" p={20}>
        <Group>
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

          <Combobox>
            <InputBase placeholder="write sum" ></InputBase>
          </Combobox>
        </Group>
      </Box>
      <Flex
        direction="column"
        wrap="wrap"
        className="items"
      >
        {filteredItems.map((item, index) => (
          <Box key={index} w={500}>
            <TodoItem
              time={item.time}
              text={item.title}
              checked={item.checkbox}
              description={item.description}
              deleteItem={() => deleteTodoItem(item.id)}
              editItem={() => getItemForEdit(item.id)}
              toggleCheckbox={() => toggleCheckbox(item.id)}
            />
          </Box>
        ))}
      </Flex>
    </Container >
  )
}

export default Todo