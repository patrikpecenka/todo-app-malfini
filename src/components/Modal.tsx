import { FunctionComponent } from 'react';
import { Button, Input, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals'

export interface TodoModel {
  title: string;
  description: string;
  checkbox: boolean;
}

interface ModalAddTodoProps {
  onSelect: (value: TodoModel) => void;
  editTodo?: TodoModel;
}

export const AddItemModal: FunctionComponent<ContextModalProps<ModalAddTodoProps>> = ({ id, context, innerProps }) => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      checkbox: false,
      ...typeof innerProps.editTodo === 'undefined' ? {} : innerProps.editTodo,
    },
    validate: {
      title: (value) => (value === '' ? 'Please enter a todo item' : null),
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
        <Input.Wrapper label="Title" size="lg" required>
          <Input
            w="400"
            color="red"
            size="lg"
            {...form.getInputProps("title")}
            placeholder="Add todo name..."
            mb="20"
          />
        </Input.Wrapper>
        <Textarea
          size="lg"
          radius="xs"
          label="Description"
          placeholder="Your description here..."
          {...form.getInputProps("description")}
          mb="20"
        />
        <Button
          type='submit'
          size="lg"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 201 }}
        >
          {innerProps.editTodo ? "Save" : "Add"}
        </Button >
      </form>
    </>
  )
};
