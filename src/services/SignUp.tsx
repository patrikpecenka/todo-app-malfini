import {
  Box,
  Divider,
  Flex,
  Paper,
  TextInput,
  Title,
  Stack,
  PasswordInput,
  Button,
  Anchor
}
  from '@mantine/core';
import { isEmail, isNotEmpty, matchesField, useForm } from '@mantine/form';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store/auth.store';

interface SignUpValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password: isNotEmpty('Empty password'),
      confirmPassword: matchesField(
        'password',
        'Passwords are not the same'
      ),
    }
  });

  const handleSignUp = async (values: SignUpValues) => {
    if (loading) {
      return;
    }

    setLoading(true);
    const registerResult = await register(values.email, values.password);
    setLoading(false);

    if (registerResult) {
      navigate('/');
    }
  };

  return (
    <Flex align="center" justify="center" w="100%" h="100vh" >
      <Paper withBorder shadow="md" p={30} radius="md" w={400}>
        <Title ta="center" order={1} mb={20}>Register</Title>
        <Divider />
        <Box component="form" maw={400} mx="auto" mt={20} onSubmit={form.onSubmit((values) => {
          handleSignUp(values);
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
            <PasswordInput
              label="Confirm password"
              placeholder="Confirm password"
              required
              disabled={loading}
              mt="md"
              {...form.getInputProps('confirmPassword')}
            />
            <Button loading={loading} fullWidth mt="xl" type="submit">
              Register
            </Button>
            <NavLink to="/">
              <Box w="100%" ta="center">
                <Anchor ta="center" underline="hover" component="div">
                  Click to login.
                </Anchor>
              </Box>
            </NavLink>
          </Stack>
        </Box>
      </Paper>

    </Flex>
  );
};

export default SignUp;

// https://mantine.dev/form/use-form/