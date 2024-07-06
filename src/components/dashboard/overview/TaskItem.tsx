import React from 'react';
import { Stack } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import { Target } from '@/types/target';
import { Button } from '@/components/commun/Button';
import { palette } from '@/styles/theme/colors';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setTarget } from '@/lib/store/reducer/useTarget';

interface TaskItemProps {
  target: Target;
  dueDate: string;
  sx?: SxProps;
  targetName: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ dueDate, target, sx, targetName }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClickRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Handle click logic here (e.g., navigate to details page)
    dispatch(setTarget(target));
    router.push('/dashboard/target/details');
  };

  return (
    <Card
      sx={{
        borderRadius: '6px',
        padding: '8px 12px',
        background: palette.primary[50],
        '& .MuiCardContent-root': {
          padding: 0,
        },
        ...sx,
      }}
      onClick={(event) => event.stopPropagation()} // Stop event propagation (if applicable)
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="column">
            <Typography>{targetName}</Typography>
            <Typography>Due {dueDate}</Typography>
          </Stack>
          <Button btnType="secondary" onClick={handleClickRow}>View</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
