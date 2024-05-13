import React from 'react';
import { Stack } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';

import { Button } from '@/components/commun/Button';
import { palette } from '@/styles/theme/colors';

interface TaskItemProps {
  target: string;
  dueDate: string;
  sx?: SxProps;
}

const TaskItem: React.FC<TaskItemProps> = ({ dueDate, target, sx }: TaskItemProps) => {
  return (
    <Card
      sx={{
        borderRadius: '6px',
        padding: '8PX 12px',
        background: palette.primary[50],
        '& .MuiCardContent-root': {
          padding: 0,
        },
        ...sx,
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="column">
            <Typography>{target}</Typography>
            <Typography> Due {dueDate}</Typography>
          </Stack>
          <Button btnType="secondary">View</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
