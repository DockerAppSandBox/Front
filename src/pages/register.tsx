import { useForm } from '@mantine/form';
import { useState } from 'react';
import { PasswordInput, Group, Button, Box, TextInput, Loader, Text } from '@mantine/core';
import axiosInstance from '../utils/axiosConfig';
import { AxiosError } from 'axios';
import Link from 'next/link';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      password: (value) => (value.length < 6 ? 'Le mot de passe doit contenir au moins 6 caractères' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Les mots de passe ne correspondent pas' : null,
    },
    validateInputOnChange: true, // Validation en temps réel
  });

  const handleSubmit = async (values: { email: string; password: string; confirmPassword: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post('/auth/register', {
        email: values.email,
        password: values.password
      });

      if (response.status === 200) {
        console.log(response.data);
        setSuccess('Session trouvée');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setError('Mot de passe ou email incorrect');
        } else if (error.response?.status === 500) {
          setError('Erreur dans la requête');
        } else {
          setError(error.message || 'Une erreur est survenue');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maw={340} mx="auto">
      {loading && <Loader color="blue" size="sm" mb="md" />}

      {error && (
        <Text color="red" size="sm" ta="center" mb="md">
          {error}
        </Text>
      )}

      {success && (
        <Text color="green" size="sm" ta="center" mb="md">
          {success}
        </Text>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="Email"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          key={form.key('password')}
          {...form.getInputProps('password')}
          error={form.errors.password}
        />

        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          key={form.key('confirmPassword')}
          {...form.getInputProps('confirmPassword')}
          error={form.errors.confirmPassword}
        />

        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            disabled={
              form.values.email.length == 0 ||
              form.values.password.length < 6 ||
              form.values.password !== form.values.confirmPassword
            }
          >
            Submit
          </Button>
        </Group>
      </form>

      <Text mt="md" size="sm" ta="center">
        Déjà un compte ?{' '}
        <Link href="/login" passHref>
          Connecter vous !!
        </Link>
      </Text>
    </Box>
  );
}

RegisterPage.getLayout = (RegisterPage: React.ReactNode) => RegisterPage;
