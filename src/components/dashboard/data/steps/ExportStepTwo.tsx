import React, { useEffect, useState } from 'react';
import FileIcon from '@/icons/FileIcon';
import { Box, Card, CardContent, CardHeader, Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
import { ArrowRight, CheckCircle, File, Info, XCircle } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';

import { IconButton } from '@/components/commun/Button/IconButton';
import { palette } from '@/styles/theme/colors';

import RowTable from '../RowTable';
import { ContainKey, HasAllKeys } from '@/lib/helper';

export default function ExportStepTwo() {
  const reqFields = ['Date' , 'Location' ,'Category' , 'Quantity'  ]
  const { columnMapped } = useSelector((state: any) => state.file);

  return (
    <Grid
      container
      xs={12}
      sx={{
        display: 'flex',
        flex: '1 0 0',
        padding: '24px 0px',
        justifyContent: 'center',
      }}
    >
      <Grid item xs={8}>
        <Typography variant="h5" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
          Columns mapping
        </Typography>
        <Typography variant="body2" color="var(--Grey-grey-400, #888909F)">
          Below is a list of columns found in your file. Please check whether the columns on the left correspond to your
          desired destination columns in Grene
        </Typography>
      </Grid>
      <Stack direction={'row'} sx={{ width: '65%', marginTop: 5 }} alignSelf={'center'}>
        <Stack direction={'row'} spacing={3} sx={{ width: '100%' }}>
          <Grid item xs={8}>
            <Grid container direction={'row'} xs={12}>
              <Grid xs={6}>
                {' '}
                <Typography gutterBottom variant="bodyB2">
                  File column <Info />{' '}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography gutterBottom variant="bodyB2">
                  Grene fields <Info />{' '}
                </Typography>
              </Grid>
            </Grid>
            
            {reqFields.map((fields) => (<RowTable title={fields} />))}
          </Grid>
          <Grid item direction={'row'} xs={4} spacing={2}>
            <Card sx={{ background: palette.primary[50], marginY: 2, boxShadow: 0 }}>
              <CardContent>
                <Typography gutterBottom variant="bodyB2" component="div">
                  Required fields <Info />
                </Typography>
                <Typography variant="body2" color={palette.gray[500]} mb={1}>
                  Make sure you've filled in all the required fields.
                </Typography>

                <Box>
                 {Object.keys(columnMapped).map((key) =>  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <CheckCircle weight="fill" color={palette.primary[500]} />
                    <Typography color={palette.primary[500]}>{key}</Typography>
                  </Stack>)}
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ background: palette.primary[50] }}>
              <CardContent>
                <Typography gutterBottom variant="bodyB2" component="div">
                  Unassociated fields <Info />
                </Typography>
                {reqFields.map((fields)  => (
                  !ContainKey(columnMapped , fields) && (
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <XCircle weight="fill" color={palette.danger[300]} />
                    <Typography color={palette.danger[300]}>{fields}</Typography>
                  </Stack>)

                ))}
                { HasAllKeys(columnMapped , reqFields) && <Typography variant="body2" color={palette.gray[500]} mb={1}>
                  All fields are associated
                </Typography>}
              </CardContent>
            </Card>
          </Grid>
        </Stack>
      </Stack>
    </Grid>
  );
}
