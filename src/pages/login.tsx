import { useForm } from '@mantine/form';
import { useState } from 'react';
import { PasswordInput, Group, Button, Box, TextInput, Loader, Text, } from '@mantine/core';
import axiosInstance from '../utils/axiosConfig';
import { AxiosError } from 'axios';
import Link from 'next/link';

export default function LogingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post('routes', values);

      if (response.status === 200) {
        console.log(response.data);
        setSuccess('Session trouvée');

        const fileName: string = 'Anticollision_' + response.data.version + '.exe';
        try {
          console.log('Appel à executeExe avec :', fileName);
          console.log('Exécution réussie :', fileName);
        } catch (error) {
          console.error('Erreur lors de l\'exécution du fichier :', error);
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setError('Mot de passe ou username incorrect');
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
          label="Username"
          placeholder="Username"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          key={form.key('password')}
          {...form.getInputProps('password')}
          error={form.errors.password}
        />

        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            disabled={
              form.values.username.length == 0 ||
              form.values.password.length == 0
            }
          >
            Submit
          </Button>
        </Group>
      </form>

      <Text mt="md" size="sm" ta="center">
        Pas de compte ?{' '}
        <Link href="/register" passHref>
          Crée en un !!
        </Link>
      </Text>
    </Box>
  );
}

LogingPage.getLayout = (LogingPage: React.ReactNode) => LogingPage;
