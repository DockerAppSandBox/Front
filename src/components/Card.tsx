import { Card, Text, Title } from "@mantine/core";

interface CardItemProps {
  title: string;
  description: string;
}


export default function CardItem({ title, description }: CardItemProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4}>{title}</Title>
      <Text size="sm" mt="sm">
        {description}
      </Text>
    </Card>
  )
}