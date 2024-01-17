import { Flex, Box, Checkbox } from "@mantine/core"
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiPencil } from '@mdi/js';


interface TodoItemProps {
  text: string
}

const TodoItem = ({ text }: TodoItemProps) => {
  return (
    <Flex justify="space-between" align="center" mb={10}>
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
          />
          <h3>{text}</h3>
        </Flex>
      </Box >
      <Icon path={mdiPencil} size={1} style={{ cursor: "pointer" }} />
      <Icon path={mdiTrashCanOutline} size={1} style={{ cursor: "pointer" }} />
    </Flex>

  )
}

export default TodoItem