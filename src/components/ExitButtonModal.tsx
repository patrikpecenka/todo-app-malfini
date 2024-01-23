import { Button, Text } from "@mantine/core";
import { modals } from '@mantine/modals';
import { mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ExitButtonModalProps {
  confirm: () => void;
}

const ExitButtonModal: FC<ExitButtonModalProps> = ({ confirm }) => {

  const { t } = useTranslation("translation")

  const openModal = () => modals.openConfirmModal({
    title: t("exit_button.title"),
    size: 'sm',
    radius: 'md',
    withCloseButton: false,
    children: (
      <Text size="md" >
        {t("exit_button.child_text")}
      </Text>
    ),
    labels: { confirm: t("exit_button.confirm"), cancel: t("exit_button.cancel") },
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