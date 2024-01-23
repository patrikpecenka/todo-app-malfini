import { FunctionComponent } from 'react';
import { Button, Input, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals'
import { useAuthStore } from 'store/auth.store';
import { useTranslation } from 'react-i18next';

export interface TodoModel {
  title: string;
  description: string;
  checkbox: boolean;
  time: string;
  position: number;
  userId: string;
}

interface ModalAddTodoProps {
  onSelect: (value: TodoModel) => void;
  editTodo?: TodoModel;
}

export const AddItemModal: FunctionComponent<ContextModalProps<ModalAddTodoProps>> = ({ id, context, innerProps }) => {
  const { userData } = useAuthStore();
  const { t } = useTranslation("translation")

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      checkbox: false,
      time: "",
      position: 0,
      userId: userData?.uid ?? '',
      ...typeof innerProps.editTodo === 'undefined' ? {} : innerProps.editTodo,
    },
    validate: {
      title: (value) => (value === '' ? t("add_item_modal.valid") : null),
    },
    validateInputOnChange: true
  });

  const onSelectButtonClicked = (formData: TodoModel) => {
    innerProps.onSelect(formData);
    form.reset();
    context.closeModal(id);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSelectButtonClicked)}>
        <Input.Wrapper label={t("add_item_modal.input_title")} size="lg" required>
          <Input
            w="400"
            color="red"
            size="lg"
            {...form.getInputProps("title")}
            placeholder={t("add_item_modal.input_ph")}
            mb="20"
          />
        </Input.Wrapper>
        <Textarea
          style={{ whiteSpace: "pre-line" }}
          size="lg"
          radius="xs"
          label={t("add_item_modal.description_title")}
          placeholder={t("add_item_modal.description_ph")}
          {...form.getInputProps("description")}
          mb="20"
        />
        <Button
          type='submit'
          size="lg"
          color='cyan'
        >
          {innerProps.editTodo ? t("add_item_modal.button_save") : t("add_item_modal.button_add")}
        </Button >
      </form>
    </>
  )
};
