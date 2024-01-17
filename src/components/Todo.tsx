import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import "../styles/Todo.css"
import { Container, Input, Button, Flex, Box } from '@mantine/core';

const Todo = () => {
  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState<string>("")

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items") as string)
    if (storedItems) {
      setItems(storedItems)
    }
  }, [])

  const createTodoItem = (e: any) => {
    e.preventDefault()
    if (input === "") {
      alert("Please fill todo input")
      return
    }

    setItems([...items, input])
    setInput("")
    localStorage.setItem("items", JSON.stringify([...items, input]))
  }

  return (
    <Container className='todo-wrapper' bg="white" maw="700" mt="30" pb="20">
      <h1 className="todo-name">Todo List</h1>
      <div className="input-button-container">
        <Input
          w="400"
          color="red"
          size="lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new todo"
        />
        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 201 }}
          onClick={createTodoItem}
        >
          Add
        </Button>
      </div>
      <Flex
        direction="column"
        wrap="wrap"
      >
        {items.map((test, index) => (
          <Box key={index} w={500}>
            <TodoItem text={test} />
          </Box>
        ))}
      </Flex>
    </Container>
  )
}

export default Todo