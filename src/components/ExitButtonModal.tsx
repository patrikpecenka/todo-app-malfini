import { Button, Text } from "@mantine/core";
import { modals } from '@mantine/modals';
import { mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import { FC } from "react";

interface ExitButtonModalProps {
  confirm: () => void;
}

const ExitButtonModal: FC<ExitButtonModalProps> = ({ confirm }) => {
  const openModal = () => modals.openConfirmModal({
    title: 'Log out',
    size: 'sm',
    radius: 'md',
    withCloseButton: false,
    children: (
      <Text size="md" >
        Do you really wanna log out?
      </Text>
    ),
    labels: { confirm: 'Yes, log out', cancel: 'Cancel' },
    onConfirm: () => confirm(),
  });

  return (
    <Button
      w="auto"
      onClick={openModal} >
      <Icon path={mdiLogout} size={1} />
    </Button>
  )
}

export default ExitButtonModal