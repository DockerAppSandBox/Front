'use client';
import { useEffect, useState } from 'react';
import { CardImage } from '../components/Card';
import { Grid, Button, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';

interface ImageData {
  id: number;
  url: string;
  likes: number;
  dislikes: number;
  liked: boolean;
  disliked: boolean;
}

export default function HomePage() {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<ImageData[]>([]);

  useEffect(() => {
    if (auth?.isAuthenticated) {
      setLoading(false);
    } else {
      router.push('/login');
    }
  }, [auth?.isAuthenticated, router]);

  useEffect(() => {
    const fakeData = Array.from({ length: 34 }, (_, index) => ({
      id: index + 1,
      url: `${process.env.NEXT_PUBLIC_SERVER_PYTHON_URL}/1.png`,
      likes: Math.floor(Math.random() * 100),
      dislikes: Math.floor(Math.random() * 50),
      liked: false,
      disliked: false,
    }));
    setImageData(fakeData);
  }, []);

  const handleLike = (id: number) => {
    setImageData((prevData) =>
      prevData.map((image) => {
        if (image.id === id) {
          // Si déjà liké, on retire le like
          if (image.liked) {
            return { ...image, likes: image.likes - 1, liked: false };
          }
          // Si pas encore liké, on ajoute un like (et retire un dislike s'il y en avait un)
          return {
            ...image,
            likes: image.likes + 1,
            liked: true,
            disliked: false,
            dislikes: image.disliked ? image.dislikes - 1 : image.dislikes,
          };
        }
        return image;
      })
    );
  };

  const handleDislike = (id: number) => {
    setImageData((prevData) =>
      prevData.map((image) => {
        if (image.id === id) {
          if (image.disliked) {
            return { ...image, dislikes: image.dislikes - 1, disliked: false };
          }
          return {
            ...image,
            dislikes: image.dislikes + 1,
            disliked: true,
            liked: false,
            likes: image.liked ? image.likes - 1 : image.likes,
          };
        }
        return image;
      })
    );
  };

  if (loading || auth?.isAuthenticated === false) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      {/* Barre de navigation avec le bouton logout */}
      <Group align="right" style={{ padding: '20px' }}>
        <Button
          variant="outline"
          color="blue"
          onClick={auth?.logout}
        >
          <Icon path={mdiAccount} size={1} />
          Logout
        </Button>
      </Group>

      <Grid>
        {imageData.map((image) => (
          <Grid.Col span={4} key={image.id}>
            <CardImage
              likes={image.likes}
              dislikes={image.dislikes}
              imageUrl={image.url}
              liked={image.liked}
              disliked={image.disliked}
              onLike={() => handleLike(image.id)}
              onDislike={() => handleDislike(image.id)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
