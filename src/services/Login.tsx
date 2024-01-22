import { Box, TextInput, Paper, Divider, Title, Stack, PasswordInput, Button, Flex, Anchor } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "store/auth.store";

interface LoginValues {
  email: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<LoginValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password: isNotEmpty('Empty password'),
    }
  });

  const handleSignIn = async (values: LoginValues) => {
    if (loading) {
      return;
    }

    setLoading(true);
    const loginResult = await login(values.email, values.password);
    setLoading(false);

    if (loginResult) {
      navigate('/');
    }
  }

  return (
    <Flex align="center" justify="center" w="100%" h="100vh" >
      <Paper withBorder shadow="md" p={30} radius="md" w={400}>
        <Title ta="center" order={1} mb={20}>Login</Title>
        <Divider />
        <Box component="form" maw={400} mx="auto" mt={20} onSubmit={form.onSubmit((values) => {
          handleSignIn(values);
        })}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="Email"
              required
              disabled={loading}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              required
              disabled={loading}
              mt="md"
              {...form.getInputProps('password')}
            />
            <Button loading={loading} fullWidth mt="xl" type="submit">
              Login
            </Button>
            <NavLink to="/signup">
              <Box w="100%" ta="center">
                <Anchor ta="center" component="div">
                  Click here to register.
                </Anchor>
              </Box>
            </NavLink>
          </Stack>
        </Box>
      </Paper>
    </Flex>
  );
};
