'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { BackForwardIcon, EnvelopeIcon, LineIcon, LocKeyIcon } from '@/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, InputLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
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
import { palette } from '@/styles/theme/colors';

import { Button } from '../commun/Button';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '' } satisfies Values;

export function ResetPasswordForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false); // State to handle password visibility

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.resetPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      setIsPending(false);

      // Redirect to a confirm password reset page or any other appropriate action
    },
    [setError]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography style={{ fontSize: '32px', fontWeight: 700 }}>Forgot password</Typography>
        <Typography variant="body1" color={palette.gray[500]}>
          Enter your email to receive a link to reset your password
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="body1" color={palette.gray[500]}>
            Email
          </Typography>
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
                  placeholder="Email"
                />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
          <Button btnType="primary" disabled={isPending} type="submit">
            Send recovery link
          </Button>

          <Box display="flex" alignItems="center" gap={1} justifyContent="center">
            <BackForwardIcon />
            <Typography fontSize="14px" color={palette.gray[600]}>
              Back To Login
            </Typography>
          </Box>
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
