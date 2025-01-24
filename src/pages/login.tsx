import { useForm } from '@mantine/form';
import { useState } from 'react';
import { PasswordInput, Group, Button, Box, TextInput, Loader, Text, } from '@mantine/core';
import axiosInstance from '../utils/axiosConfig';
import { AxiosError } from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


export default function LogingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post('/auth/login', {
        email: values.email,
        password: values.password
      });

      if (response.status === 200) {
        setSuccess('utilisateur créer');
      
        Cookies.set('authToken', response.data.token, {
          expires: 7, // Durée de validité de 7 jours
          secure: process.env.NODE_ENV === 'production', // Secure en production uniquement
          sameSite: 'Strict', // Protection CSRF
        });
    
        // Optionnel : Rediriger l'utilisateur vers le dashboard après inscription
        router.push('/');
      }


    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setError('Mot de passe ou email incorrect');
        } else if (error.response?.status === 500) {
          setError('Erreur dans la requête');
        } else {
          setError(error.response?.data.error || 'Une erreur est survenue');
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

        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            disabled={
              form.values.email.length == 0 ||
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
