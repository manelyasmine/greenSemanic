import React, { ReactNode } from 'react';
import DZIcon from '@/icons/DZIcon';
import { Box, Grid, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import { palette } from '@/styles/theme/colors';

export interface ListItemProgressProps {
  sx?: any;
  title: string;
  icon: ReactNode;
  progress: number;
}

export default function ListItemProgress({ sx, title, icon, progress }: ListItemProgressProps): React.JSX.Element {
  return (
    <Grid container>
      <Grid lg={1} sx={{ alignContent: 'center' }}>
        {icon}
      </Grid>
      <Grid lg={11}>
        <Typography mb={1}>{title}</Typography>
        <Stack width="100%" direction="row" spacing={3}>
          <Box width="100%" sx={{ alignContent: 'center' }}>
            <LinearProgress
              sx={{
                '& .MuiLinearProgress-bar': {
                  backgroundColor: palette.success[500],
                },
                background: palette.primary[100],
                height:8,
                borderRadius:1
              }}
              variant="determinate"
              value={progress}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {progress}%
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}