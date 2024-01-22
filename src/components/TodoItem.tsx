import { Flex, Box, Checkbox, Text, Button, Collapse, Group } from "@mantine/core"
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiPencil, mdiChevronRight, mdiChevronDown } from '@mdi/js';
import "../styles/TodoItem.css"
import { useDisclosure } from "@mantine/hooks";

interface TodoItemProps {
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
    <Flex direction="row" miw="100%" align="top" style={{ borderBottom: "solid 1px #15aabf" }} bg={checked ? "rgba(80,150,120, 0.2)" : "rgba(21, 170, 191, 0.1)"} mb={20}>
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
        <Flex justify="left" mb={5} align="left">
          <Box onClick={toggle} style={{ cursor: "pointer" }} w="100%">
            <Text
              fw={700}
              mt={10}
              size="20px"
              c={checked ? "dimmed" : ""}
              td={checked ? "line-through" : ""}
            >
              {text}
            </Text>
            {checked
              ? <Text size="xs" c="dimmed" ta="right" mr={12}>{`Task finished at: ${time}`}</Text>
              : null
            }
          </Box>
        </Flex>
        <Collapse in={opened} transitionDuration={500} transitionTimingFunction="linear" w="100%">
          <Group justify="space-between" align="center" w="100%">
            <Text
              c={checked ? "dimmed" : ""}
              td={checked ? "line-through" : ""}
            >
              {description}
            </Text>

            <Box h="100%" mb={10}>
              {checked
                ? null
                : <Button onClick={editItem} variant="outline" color="rgba(64, 150, 255, 1)" size="xs" radius="lg" mr={10}>
                  <Icon path={mdiPencil} size={0.8} color="rgba(64, 150, 255, 1)" style={{ cursor: "pointer" }} />
                </Button>
              }



              <Button onClick={deleteItem} variant="outline" color="rgba(255, 61, 61, 1)" size="xs" radius="lg">
                <Icon path={mdiTrashCanOutline} size={0.8} color="rgba(255, 61, 61, 1)" style={{ cursor: "pointer" }} />
              </Button>
            </Box>


          </Group>
        </Collapse>
      </Box >
      <Box mt={10}>
        {opened ? <Icon path={mdiChevronDown} size={1} /> : <Icon path={mdiChevronRight} size={1} />}
      </Box>
    </Flex >




    /* <Box w="100%" >
     <Flex justify="space-between"
   //     align="center"
   //     mb={10}
   //     w="100%"
   //   >
   //     <Paper shadow="xl" radius="xl" p="xl" withBorder style={{ border: "solid 1px grey" }}  >
   //       <Group
   //         gap={0}
   //         w="100%"
   //       >
   // <Flex justify="space-between" align="center" w="100%" >
   //   <Flex align="center">
   //     <Checkbox
   //       radius="xl"
   //       iconColor="white"
   //       size="20"
   //       m={10}
   //       checked={checked}
   //       onChange={toggleCheckbox}
   //     />
   //     <Text
   //       fw={700}
   //       size="lg"
   //       c={checked ? "dimmed" : ""}
   //       td={checked ? "line-through" : ""}
   //     >
   //       {text}
   //     </Text>
   //   </Flex>
   //   <Flex gap={10} mt={10} mr={10}>
   //     <Button onClick={editItem} variant="filled" color="rgba(54, 124, 255, 0.74)" size="xs" radius="lg">
   //       <Icon path={mdiPencil} size={0.8} color="white" style={{ cursor: "pointer" }} />
   //     </Button>
   //     <Button onClick={deleteItem} variant="filled" color="rgba(255, 74, 74, 0.74)" size="xs" radius="lg">
   //       <Icon path={mdiTrashCanOutline} size={0.8} color="white" style={{ cursor: "pointer" }} />
   //     </Button>
   //   </Flex>
   // </Flex>
   //         <Flex ml={10} direction="column" w="100%">
   //           <Text
   //             c={checked ? "dimmed" : ""}
   //             td={checked ? "line-through" : ""}
   //           >
   //             {description}
   //           </Text>
   //           <Text size="xs" c="dimmed" ta="right" mr={12}>{time}</Text>
   //         </Flex>
   //       </Group>
   //     </Paper>
   //   </Flex>
   // </Box > */
  )
}

export default TodoItem