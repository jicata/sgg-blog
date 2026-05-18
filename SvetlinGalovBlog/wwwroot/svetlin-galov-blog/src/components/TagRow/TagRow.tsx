import { Box } from '@mui/material';
import Tag from '../Tag/Tag';

interface TagRowProps {
  tags: string[];
  gap?: string | number;
}

const TagRow = ({ tags, gap = 6 }: TagRowProps) => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: typeof gap === 'number' ? `${gap}px` : gap,
    }}
  >
    {tags.map((tag, i) => (
      <Tag key={i}>{tag}</Tag>
    ))}
  </Box>
);

export default TagRow;
