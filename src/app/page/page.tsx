import { Grid } from '@mantine/core';
import CardItem from "@/app/components/Card"

const cardsData = [
  { id: 1, title: "Card 1", description: "This is the first card" },
  { id: 2, title: "Card 2", description: "This is the second card" },
  { id: 3, title: "Card 3", description: "This is the third card" },
  { id: 4, title: "Card 4", description: "This is the fourth card" },
  { id: 5, title: "Card 5", description: "This is the fifth card" },
  { id: 6, title: "Card 6", description: "This is the sixth card" },
  { id: 7, title: "Card 7", description: "This is the seventh card" },
  { id: 8, title: "Card 8", description: "This is the eighth card" },
];

export default function Home() {
  return (
    <Grid>
    {cardsData.map((card) => (
      <Grid.Col key={card.id} span={3}> {/* 3 signifie 1/4 de la grille */}
        <CardItem title={card.title} description={card.description}>
        </CardItem>
      </Grid.Col>
    ))}
  </Grid>
  );
}
