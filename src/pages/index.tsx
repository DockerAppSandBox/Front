import { useState, useEffect } from "react";
import { Welcome } from "../components/Welcome/Welcome";
import { CardImage } from "../components/Card";
import { Grid } from "@mantine/core";
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

interface ImageData {
  id: number;
  url: string;
  likes: number;
  dislikes: number;
}

export default function HomePage() {

    const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      router.push('/login');  // Redirige vers la page de connexion si non connecté
    }
  }, [auth, router]);

  // Si l'utilisateur n'est pas encore authentifié, on ne montre rien
  if (!auth?.isAuthenticated) {
    return null;
  }
  const [imageData, setImageData] = useState<ImageData[]>([]);

  useEffect(() => {
    const fakeData = Array.from({ length: 4 }, (_, index) => ({
      id: index + 1,
      url: `https://picsum.photos/400/300?random=${index + 1}`,
      likes: Math.floor(Math.random() * 100),
      dislikes: Math.floor(Math.random() * 50),
    }));
    setImageData(fakeData);
  }, []);

  return (
    <>
      <Welcome />
      <Grid>
      {imageData.map((image) => (
          <Grid.Col span={4}>
            <CardImage key={image.id} likes={image.likes} dislikes={image.dislikes} imageUrl={image.url} />
          </Grid.Col >
      ))}
      </Grid>
    </>
  );
}
