import { Card, Image, Button, Group } from '@mantine/core';
import { mdiThumbUpOutline, mdiThumbDownOutline } from '@mdi/js';
import Icon from '@mdi/react';

interface CardItemProps {
  likes: number;
  dislikes: number;
  imageUrl: string;
  liked: boolean;
  disliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}

export function CardImage({ likes, dislikes, imageUrl, liked, disliked, onLike, onDislike }: CardItemProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={imageUrl} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="center" mt="md">
        <Button color="green" radius="md" variant={liked ? 'filled' : 'outline'} leftSection={<Icon path={mdiThumbUpOutline} size={1} />} onClick={onLike}>
          Like ({likes})
        </Button>
        <Button color="red" radius="md" ml="sm" variant={disliked ? 'filled' : 'outline'} leftSection={<Icon path={mdiThumbDownOutline} size={1} />} onClick={onDislike}>
          Dislike ({dislikes})
        </Button>
      </Group>
    </Card>
  );
}
