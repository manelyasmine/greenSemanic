import React from 'react';
import { VectorICon } from '@/icons';
import styled from '@emotion/styled';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Paperclip, X } from '@phosphor-icons/react';
import { useDispatch, useSelector } from 'react-redux';

import { clearFile, setFile } from '@/lib/store/reducer/useFile';
import { Button } from '@/components/commun/Button';
import { IconButton } from '@/components/commun/Button/IconButton';
import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type ExportStepOneProps = {
  handleSaveFile: () => void;
};
export default function ExportStepOne() {
  const dispatch = useDispatch();
  const { file } = useSelector((state: any) => state.file);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    dispatch(setFile(selectedFile));
  };
  return (
    <Grid
      container
      xs={12}
      sx={{
        display: 'flex',
        flex: '1 0 0',
        padding: '24px 0px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid item xs={10}>
        <Typography variant="h5" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
          Upload file
        </Typography>
        <Typography variant="body2" color="var(--Grey-grey-400, #888909F)">
          To add new entries to Grene and update data, import the file. Please consult our
          <span
            style={{
              color: 'var(--Green-green-500, #16B364)',
              fontFamily: 'Mulish',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '150%',
            }}
          >
            {' '}
            import guide{' '}
          </span>
          or{' '}
          <span
            style={{
              color: 'var(--Green-green-500, #16B364)',
              fontFamily: 'Mulish',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '150%',
            }}
          >
            download the template{' '}
          </span>{' '}
          to get started.
        </Typography>

        <Grid
          item
          sx={{
            display: 'flex',
            padding: '32px',
            flexDirection: 'column',
            marginTop: '32px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '22px',
            alignSelf: 'stretch',
            borderRadius: 'var(--Components-Pagination-Component-itemSizeSM, 24px)',
            border: '1px dashed var(--Foundation-Grey-grey-300, #787486)',
          }}
        >
          {/* <IconButton btnType='secondary'> */}
          <VectorICon />
          {/* </IconButton> */}
          {file && (
            <Stack
              direction={'row'}
              sx={{
                display: 'flex',
                borderRadius: 3,
                background: palette.gray[25],
                alignItems: 'center',
                // justifyContent: 'column',
                paddingX: 5,
                paddingY: 3,
                width: 366,
              }}
              justifyContent={'space-between'}
            >
              <Stack
                direction={'row'}
                spacing={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {' '}
                <Paperclip /> {file.name}
              </Stack>
              <Box>
                <IconButton btnType={'dashBorder'} onClick={() => dispatch(clearFile())}>
                  {' '}
                  <X />{' '}
                </IconButton>
              </Box>
            </Stack>
          )}
          <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'column', gap: '8px' }}>
            <Typography
              sx={{
                color: 'var(--Foundation-Grey-grey-400, #48494D)',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '20px',
              }}
            >
              Drag & Drop{' '}
              <span
                style={{
                  color: 'var(--Foundation-Grey-grey-400, #48494D)',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '20px',
                }}
              >
                a file here or{' '}
              </span>
            </Typography>

            <Button
              btnType="primary"
              tabIndex={-1}
              component="label"
              role={undefined}
              sx={{
                ...MuiButton.styleOverrides.sizeSmall,
                borderRadius: '6px',
                background: 'var(--Green-green-500, #16B364)',
              }}
            >
              {' '}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} accept=".csv" />
              <Typography variant="h6" sx={{ color: 'var(--Colors-Base-00, #FFF)' }}>
                Browse
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
