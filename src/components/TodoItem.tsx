import { Flex, Box, Checkbox, Text } from "@mantine/core"
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiPencil } from '@mdi/js';
import "../styles/TodoItem.css"

interface TodoItemProps {
  text: string,
  description: string,
  deleteItem: () => void,
  editItem: () => void
  toggleCheckbox: () => void,
  time: string
  checked: boolean
}

const TodoItem = ({ text, description, deleteItem, editItem, time, toggleCheckbox, checked }: TodoItemProps) => {
  return (
    <Box w="100%">
      <Flex justify="space-between" align="center" mb={10} className="item" >
        <Box
          bg="#cce1f3"
          w={400}
          style={{
            borderRadius: "5px"
          }}
        >
          <Flex justify="left" align="center">
            <Checkbox
              color="lime.4"
              iconColor="dark.8"
              size="20"
              m={10}
              checked={checked}
              onChange={toggleCheckbox}
            />
            <Text
              fw={700} size="lg"
              c={checked ? "dimmed" : ""}
              td={checked ? "line-through" : ""}
            >
              {text}
            </Text>
          </Flex>
          <Flex ml={10} direction="column">
            <Text
              c={checked ? "dimmed" : ""}
              td={checked ? "line-through" : ""}
            >
              {description}
            </Text>
            <Text size="xs" c="dimmed" ta="right" mr={10}>{time}</Text>
          </Flex>
        </Box >
        <Box onClick={editItem}>
          <Icon path={mdiPencil} size={1} style={{ cursor: "pointer" }} />
        </Box>
        <Box onClick={deleteItem}>
          <Icon path={mdiTrashCanOutline} size={1} style={{ cursor: "pointer" }} />
        </Box>
      </Flex>
    </Box>
  )
}

export default TodoItem