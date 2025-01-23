import { Card, Image, Button, Group } from '@mantine/core';
import { mdiThumbUpOutline , mdiThumbDownOutline } from '@mdi/js';
import Icon from '@mdi/react';

interface CardItemProps {
  likes: number;
  dislikes: number;
  imageUrl: string;
}

export function CardImage({ likes, dislikes, imageUrl }: CardItemProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={imageUrl} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="center" mt="md">
        <Button color="green" radius="md" leftSection={<Icon path={mdiThumbUpOutline} size={1} />}>
          Like ({likes})
        </Button>
        <Button color="red" radius="md" ml="sm" leftSection={<Icon path={mdiThumbDownOutline} size={1} />}>
          Dislike ({dislikes})
        </Button>
      </Group>
    </Card>
  );
}
