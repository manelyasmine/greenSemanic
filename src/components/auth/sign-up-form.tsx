'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { EnvelopeIcon, LineIcon, LocKeyIcon } from '@/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import {LogoLightIcon} from '@/icons';
import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import { palette } from '@/styles/theme/colors';

import { Button } from '../commun/Button';
import { setUser } from '@/lib/store/reducer/userSlice';
import { useDispatch } from 'react-redux';

const schema = zod
  .object({
    firstname: zod.string().min(1, { message: 'First name is required' }),
    lastname: zod.string().min(1, { message: 'Last name is required' }),
    email: zod.string().email({ message: 'Invalid email format' }).min(1, { message: 'Email is required' }),
    password: zod.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: zod.string().min(6, { message: 'Password confirmation must be at least 6 characters long' }),
    terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Values = zod.infer<typeof schema>;

const defaultValues: Values = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
};

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const { checkSession } = useUser();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signUp(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();
      console.log('call from sign up')
      dispatch(setUser(await authClient.getUser()))

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
      <Stack spacing={1} sx={{display:'flex',flexDirection:"row",color:"#161616",padding:2}}>

        
<LogoLightIcon/>
</Stack>
        <Typography variant="h4">Sign Up</Typography>
        <Typography color="text.secondary" variant="body2">
          Welcome! Let’s create your account.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="firstname"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstname)} fullWidth>
                <OutlinedInput {...field} placeholder="First Name" label="First Name" />
                {errors.firstname && <FormHelperText error>{errors.firstname.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="lastname"
            render={({ field }) => (
              <FormControl error={Boolean(errors.lastname)} fullWidth>
                <OutlinedInput {...field} placeholder="Last Name" label="Last Name" />
                {errors.lastname && <FormHelperText error>{errors.lastname.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)} variant="outlined" fullWidth>
                <OutlinedInput
                  {...field}
                  startAdornment={
                    <InputAdornment position="start" sx={{ marginRight: '8px' }}>
                      <Box display="flex" gap={2}>
                        <EnvelopeIcon width={20} height={20} color="#727C8D" />
                        <LineIcon height={20} color="#B3B8C2" />
                      </Box>
                    </InputAdornment>
                  }
                  type="email"
                  placeholder="Email or Username"
                />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
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
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} />}
                label={
                  <Typography color="text.secondary" variant="body2">
                    I have read and accept the{' '}
                    <Link href="#" target="_blank" underline="hover" color={palette.primary[500]}>
                      terms and conditions
                    </Link>
                  </Typography>
                }
              />
            )}
          />

          {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

          <Button btnType="primary" disabled={isPending} type="submit">
            Sign Up
          </Button>
          <Box textAlign="center">
            <Typography color="text.secondary" variant="body2">
              Already have an account?{' '}
              <Link
                component={RouterLink}
                href={paths.auth.signIn}
                underline="hover"
                variant="subtitle2"
                color={palette.primary[500]}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
}

