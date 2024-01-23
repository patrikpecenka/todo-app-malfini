import { Flex, Box, Checkbox, Text, Button, Collapse } from "@mantine/core"
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiPencil, mdiChevronRight, mdiChevronDown } from '@mdi/js';
import "../styles/TodoItem.css"
import { useDisclosure } from "@mantine/hooks";

export interface TodoItemProps {
  text: string;
  description: string;
  deleteItem: () => void;
  editItem: () => void;
  toggleCheckbox: () => void;
  time: string;
  checked: boolean;
}

const TodoItem = ({ text, description, deleteItem, editItem, time, toggleCheckbox, checked }: TodoItemProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Flex direction="row" miw="100%" align="top" pt={5} style={{ borderBottom: "solid 1px #15aabf" }} bg={checked ? "rgba(80,150,120, 0.2)" : "rgba(21, 170, 191, 0.1)"} mb={20}>
      <Checkbox
        radius="xl"
        iconColor="white"
        size="20"
        variant="outline"
        m={10}
        checked={checked}
        onChange={toggleCheckbox}
      />
      <Box mx="auto" w="100%">
        <Flex justify="left" mb={5} align="left" >
          <Box onClick={toggle} style={{ cursor: "pointer" }} w="100%">
            <Text
              fw={700}
              mt={10}
              mb={10}
              size="20px"
              c={checked ? "dimmed" : ""}
              td={checked ? "line-through" : ""}
            >
              {text}
            </Text>
          </Box>
        </Flex>
        <Collapse in={opened} transitionDuration={500} transitionTimingFunction="linear" >
          <Flex align="left" direction="column">
            <Text
              style={{ whiteSpace: "wrap" }}
              c={checked ? "dimmed" : ""}
              td={checked ? "line-through" : ""}
            >
              {description}
            </Text>

            <Flex h="100%" mb={10} mt={10} w="100%" justify="flex-end">
              {checked
                ? null
                : <Button onClick={editItem} variant="outline" color="rgba(64, 150, 255, 1)" size="xs" radius="lg" mr={10}>
                  <Icon path={mdiPencil} size={0.8} color="rgba(64, 150, 255, 1)" style={{ cursor: "pointer" }} />
                </Button>
              }

              <Button onClick={deleteItem} variant="outline" color="rgba(255, 61, 61, 1)" size="xs" radius="lg">
                <Icon path={mdiTrashCanOutline} size={0.8} color="rgba(255, 61, 61, 1)" style={{ cursor: "pointer" }} />
              </Button>
            </Flex>

          </Flex>
        </Collapse>
        {checked
          ? <Text size="xs" c="dimmed" ta="right" mr={12} mb={10}>{`Task finished at: ${time}`}</Text>
          : null
        }
      </Box >
      <Box mt={10} mr={10}>
        {opened ? <Icon path={mdiChevronDown} size={1} /> : <Icon path={mdiChevronRight} size={1} />}
      </Box>
    </Flex >

  )
}

export default TodoItem