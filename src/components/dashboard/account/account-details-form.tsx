'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
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
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/client';
import { setUser } from '@/lib/store/reducer/userSlice';
import { Alert } from '@/components/commun/Alerts/Alert';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
] as const;

const schema = zod.object({
  firstname: zod.string().min(1, { message: 'First name is required' }),
  lastname: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().email({ message: 'Invalid email format' }).min(1, { message: 'Email is required' }),
  phone: zod.string().min(1, { message: 'Phone is required' }),
});

type Values = zod.infer<typeof schema>;

export function AccountDetailsForm(): React.JSX.Element {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [type, setType] = React.useState<'error' | 'success'>('error');
  const [message, setMessage] = React.useState('')
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      const { error } = await authClient.updateUserInfo(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setMessage(error)
        setType('error');
        return;
      } else {
        setType('success');
        setMessage('Infromation saved successfully!')
        dispatch(setUser(await authClient.getUser()));
      }
    },
    [setError]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <Controller
                name="firstname"
                control={control}
                defaultValue={user.firstname}
                render={({ field }) => (
                  <FormControl fullWidth required>
                    <InputLabel>First name</InputLabel>
                    <OutlinedInput {...field} label="First name" />
                    {errors.firstname && <p>{errors.firstname.message}</p>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                name="lastname"
                control={control}
                defaultValue={user.lastname}
                render={({ field }) => (
                  <FormControl fullWidth required>
                    <InputLabel>Last name</InputLabel>
                    <OutlinedInput {...field} label="Last name" />
                    {errors.lastname && <p>{errors.lastname.message}</p>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue={user.email}
                render={({ field }) => (
                  <FormControl fullWidth required>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput {...field} label="Email address" />
                    {errors.email && <p>{errors.email.message}</p>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                name="phone"
                control={control}
                defaultValue={user.phone}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Phone number</InputLabel>
                    <OutlinedInput {...field} label="Phone number" type="tel" />
                    {errors.phone && <p>{errors.phone.message}</p>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select defaultValue="new-york" label="State" name="state" variant="outlined">
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <OutlinedInput label="City" />
              </FormControl>
            </Grid>
          </Grid>

          {/* {errors.root && (
            <Alert  sx={{ marginTop: 2 }} severity={'error'}>
              {errors.root.message}
            </Alert>
          )} */}
          
            <Alert setChildren={setMessage} sx={{ marginTop: 2 }} severity={type}>
              {message}
            </Alert>
        </CardContent>

        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
