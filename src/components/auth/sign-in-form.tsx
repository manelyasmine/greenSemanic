'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import LoginWithGoogleButton from '@/app/auth/googleAuth/googleAuth';
import { EnvelopeIcon, LineIcon, LocKeyIcon } from '@/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Checkbox, FormControlLabel, InputAdornment } from '@mui/material';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import { palette } from '@/styles/theme/colors';

import { Button } from '../commun/Button';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
  rememberMe: zod.boolean().optional(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'afafkelly@gmail.com', password: 'Secret1' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signInWithPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={4}>
      <Box>Logo</Box>
      <Stack spacing={1}>
        <Typography variant="h4">Login</Typography>
        <Typography color="text.secondary" variant="body2">
          Welcome back! Login to your Grene account
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
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
              <FormControl error={Boolean(errors.password)}>
                <OutlinedInput
                  {...field}
                  startAdornment={
                    <InputAdornment position="start" sx={{ marginRight: '8px' }}>
                      <Box display="flex" gap={2}>
                        <LocKeyIcon width={20} height={20} color="#727C8D" />
                        <LineIcon height={20} color="#B3B8C2" />
                      </Box>
                    </InputAdornment>
                  }
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Controller
              control={control}
              name="rememberMe"
              render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label="Remember Me" />}
            />
            <Link
              component={RouterLink}
              href={paths.auth.resetPassword}
              variant="subtitle2"
              color={palette.primary[500]}
            >
              Forgot password?
            </Link>
          </Stack>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}

          <Button btnType="primary" disabled={isPending} type="submit">
            Login
          </Button>
          <LoginWithGoogleButton />
          <Stack alignItems="center">
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an account?{' '}
              <Link
                component={RouterLink}
                href={paths.auth.signUp}
                underline="hover"
                variant="subtitle2"
                color={palette.primary[500]}
              >
                Sign up
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
