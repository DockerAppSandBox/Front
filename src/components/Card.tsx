import { Card, Image, Button, Group } from '@mantine/core';
import { mdiThumbUpOutline } from '@mdi/js';
import Icon from '@mdi/react';

interface CardItemProps {
  likes: number;
  imageUrl: string;
  liked: boolean;
  disliked: boolean;
  onLike: () => void;
}

export function CardImage({ likes, imageUrl, liked, onLike}: CardItemProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={`${process.env.NEXT_PUBLIC_SERVER_PYTHON_URL}/${imageUrl}`} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="center" mt="md">
      <Button
          color={liked ? 'green' : 'gray'}
          radius="md"
          variant={liked ? 'filled' : 'outline'}
          leftSection={<Icon path={mdiThumbUpOutline} size={1} />}
          onClick={onLike}
        >
          Like ({likes})
        </Button>
      </Group>
    </Card>
  );
}
