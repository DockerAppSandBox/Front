'use client';
import { useEffect, useState } from 'react';
import { CardImage } from '../components/Card';
import { Grid, Button, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';
import axiosInstance from '../utils/axiosConfig';

interface ImageData {
  id: string;
  imageUrl: string;
  likesCount: number;
  liked: boolean;
  disliked: boolean;
}

interface LikedImage {
  id: string;
  imageUrl: string;
  likesCount: number;
  dislikesCount: number;
}

export default function HomePage() {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [likedImages, setLikedImages] = useState<LikedImage[]>([]);

  useEffect(() => {
    if (auth?.isAuthenticated) {
      setLoading(false);
    } else {
      router.push('/login');
    }
  }, [auth?.isAuthenticated, router]);

  useEffect(() => {
    const fetchImagesAndLikes = async () => {
      try {
        // Récupérer toutes les images
        const imagesResponse = await axiosInstance.get('/image/');
        const images: ImageData[] = imagesResponse.data;

        // Récupérer les images likées par l'utilisateur
        const likedResponse = await axiosInstance.get('/vote/user');
        const likedImages: LikedImage[] = likedResponse.data;

        // Comparer les images récupérées avec celles likées
        const updatedImages = images.map((image) => ({
          ...image,
          liked: likedImages.some((liked) => liked.id === image.id),
        }));

        setImageData(updatedImages);
        setLikedImages(likedImages);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchImagesAndLikes();
  }, []);

  const handleLike = async (imageId: string, liked: boolean) => {
    try {
      if (liked) {
        // Unlike l'image
        await axiosInstance.delete(`/vote/${imageId}`);
        setLikedImages(likedImages.filter((img) => img.id !== imageId));
        setImageData((prev) =>
          prev.map((image) =>
            image.id === imageId ? { ...image, liked: false, likesCount: image.likesCount - 1 } : image
          )
        );
      } else {
        // Like l'image
        await axiosInstance.post('/vote', { like: true, imageId });
        setLikedImages([...likedImages, { id: imageId, imageUrl: '', likesCount: 0, dislikesCount: 0 }]);
        setImageData((prev) =>
          prev.map((image) =>
            image.id === imageId ? { ...image, liked: true, likesCount: image.likesCount + 1 } : image
          )
        );
      }
    } catch (error) {
      console.error("Erreur lors du like/unlike de l'image:", error);
    }
  };

  if (loading || auth?.isAuthenticated === false) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      {/* Barre de navigation avec le bouton logout */}
      <Group align="right" style={{ padding: '20px' }}>
        <Button variant="outline" color="blue" onClick={auth?.logout}>
          <Icon path={mdiAccount} size={1} />
          Logout
        </Button>
      </Group>

      <Grid>
        {imageData.map((image) => (
          <Grid.Col span={4} key={image.id}>
            <CardImage
              likes={image.likesCount}
              imageUrl={image.imageUrl}
              liked={image.liked}
              disliked={image.disliked}
              onLike={() => handleLike(image.id, image.liked)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
