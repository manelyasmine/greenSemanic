'use client';

import * as React from 'react';
import { EnvelopeIcon, LineIcon, LocKeyIcon } from '@/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormHelperText, InputAdornment, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/client';
import { setUser } from '@/lib/store/reducer/userSlice';
import { Alert } from '@/components/commun/Alerts/Alert';
import { Button } from '@/components/commun/Button';
import { userApis } from '@/lib/user/userApis';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
] as const;

const schema = zod
  .object({
    currentpassword: zod.string().min(6, { message: 'Current password must be entred' }),
    password: zod.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: zod.string().min(6, { message: 'Password confirmation must be at least 6 characters long' }),
    //timezone: zod.string().min(1, { message: 'Timezone is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Values = zod.infer<typeof schema>;

export function PasswordChangesForm(): React.JSX.Element {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [type, setType] = React.useState<'error' | 'success'>('error');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState('');
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      const { error, res } = await userApis.updateCurrentUser(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setMessage(error);
        setType('error');
        return;
      } else {
        setType('success');
        setMessage('Infromation saved successfully!');
        dispatch(setUser(res))
        // dispatch(setUser(await authClient.getUser()));
      }
    },
    [setError]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent> */}

      <Grid container spacing={3}>
        <Grid md={12} xs={12}>
          <Controller
            control={control}
            name="currentpassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)} fullWidth>
                <OutlinedInput
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Current Password"
                  startAdornment={
                    <InputAdornment position="start" sx={{ marginRight: '8px' }}>
                      <Box display="flex" gap={2}>
                        <LocKeyIcon width={20} height={20} color="#727C8D" />
                        <LineIcon height={20} color="#B3B8C2" />
                      </Box>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {showPassword ? (
                        <EyeIcon cursor="pointer" onClick={() => setShowPassword(false)} />
                      ) : (
                        <EyeSlashIcon cursor="pointer" onClick={() => setShowPassword(true)} />
                      )}
                    </InputAdornment>
                  }
                />
                {errors.currentpassword && <FormHelperText error>{errors.currentpassword.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid md={12} xs={12}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)} fullWidth>
                <OutlinedInput
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  startAdornment={
                    <InputAdornment position="start" sx={{ marginRight: '8px' }}>
                      <Box display="flex" gap={2}>
                        <LocKeyIcon width={20} height={20} color="#727C8D" />
                        <LineIcon height={20} color="#B3B8C2" />
                      </Box>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {showPassword ? (
                        <EyeIcon cursor="pointer" onClick={() => setShowPassword(false)} />
                      ) : (
                        <EyeSlashIcon cursor="pointer" onClick={() => setShowPassword(true)} />
                      )}
                    </InputAdornment>
                  }
                />
                {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid md={12} xs={12}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmPassword)} fullWidth>
                <OutlinedInput
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  startAdornment={
                    <InputAdornment position="start" sx={{ marginRight: '8px' }}>
                      <Box display="flex" gap={2}>
                        <LocKeyIcon width={20} height={20} color="#727C8D" />
                        <LineIcon height={20} color="#B3B8C2" />
                      </Box>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {showPassword ? (
                        <EyeIcon cursor="pointer" onClick={() => setShowPassword(false)} />
                      ) : (
                        <EyeSlashIcon cursor="pointer" onClick={() => setShowPassword(true)} />
                      )}
                    </InputAdornment>
                  }
                />
                {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
        <Alert setChildren={setMessage} sx={{ marginTop: 2 }} severity={type}>
          {message}
        </Alert>{' '}
        <Grid md={12} xs={12} justifyContent="flex-end" sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button type="submit" variant="contained" btnType="primary">
            Update password
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
