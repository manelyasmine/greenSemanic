import React from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarGroup, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Box, SxProps } from '@mui/system';
import { useSelector } from 'react-redux';

import { Button } from '@/components/commun/Button';
<<<<<<< Updated upstream
import Chip from '@/components/commun/chip/Chip';
=======
import ChipTrend from '@/components/commun/chip/ChipTrend';
>>>>>>> Stashed changes
import EmissionByTypeItem from '@/components/special/ListItem/EmissionByTypeItem';
import { palette } from '@/styles/theme/colors';
import dayjs from 'dayjs';

interface DetailsCardProps {
  sx?: SxProps;
}
export default function DetailsCard({ sx }: DetailsCardProps) {
  const { target } = useSelector((state: any) => state.target);
  const router = useRouter();
  if (!target) {
    router.push('/errors/not-found');
    return;
  } else if(target) {
    return (
      <Card sx={sx}>
        <CardHeader
          title={
            <Typography variant="h6" component="div" fontWeight={700}>
              Details
            </Typography>
          }
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Grid container alignItems="center" my={1}>
                <Grid lg={6} sm={6} xs={6}>
                  <Typography sx={{ fontWeight: 'bold' }}>Name </Typography>
                </Grid>
                <Grid lg={6} sm={6} xs={6}>
                  <Typography sx={{}} color={palette.gray[400]}>
                    {target.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" my={1}>
                <Grid lg={6} sm={6} xs={6}>
                  <Typography sx={{ fontWeight: 'bold' }}>Type </Typography>
                </Grid>
                <Grid lg={6} sm={6} xs={6}>
                  <Chip children={target.type} chipType="info" />
                </Grid>
              </Grid>

              <Grid container alignItems="center" my={1}>
                <Grid lg={6} sm={6} xs={6}>
                  <Typography sx={{ fontWeight: 'bold' }}>Created</Typography>
                </Grid>
                <Grid lg={6} sm={6} xs={6}>
                  <Typography sx={{}} color={palette.gray[400]}>
                    {dayjs(target.createdAt).format('MMM D, YYYY')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" my={1}>
                <Grid lg={6} sm={6} xs={6}>
                  <Typography sx={{ fontWeight: 'bold' }}>Target by year </Typography>
                </Grid>
                <Grid lg={6} sm={6} xs={6}>
                  <Typography sx={{}} color={palette.gray[400]}>
                    {target.baseYear}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container alignItems="center" my={1}>
                <Grid lg={6} sm={6} xs={6}>
                  <Typography sx={{ fontWeight: 'bold' }}>Progress </Typography>
                </Grid>
                <Grid lg={6} sm={6} xs={6}>
                  <Stack direction="row" spacing={3} width="100%">
                    <Box width="50%" sx={{ alignContent: 'center' }}>
                      <LinearProgress
                        sx={{
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: palette.success[500],
                          },
                          background: palette.primary[100],
                          height: 8,
                          borderRadius: 1,
                        }}
                        variant="determinate"
                        value={target.emissionReduction}
                      />
                    </Box>
                    <Typography variant="body2" color={palette.primary[500]}>
                      {target.emissionReduction} %
                    </Typography>
                  </Stack>
                </Grid>

                <Grid container my={1}>
                  <Grid lg={6} sm={6} xs={6}>
                    <Typography sx={{ fontWeight: 'bold' }}>Assigned users</Typography>
                  </Grid>
                  <Grid lg={6} sm={6} xs={6} justifyContent="flex-end">
                    <AvatarGroup max={4} sx={{ justifyContent: 'start' }}>
                      <Avatar alt="Remy Sharp" src="/assets/avatar-1.png" />
                      <Avatar alt="Travis Howard" src="/assets/avatar-2.png" />
                      <Avatar alt="Cindy Baker" src="/assets/avatar-3.png" />
                      <Avatar alt="Agnes Walker" src="/assets/avatar-4.png" />
                      <Avatar alt="Trevor Henderson" src="/assets/avatar-5.png" />
                    </AvatarGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }
}
