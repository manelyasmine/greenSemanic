'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

import { usePopover } from '@/hooks/use-popover';
import ThemeToggle from '@/components/commun/ThemeToggle/ThemeToggle';
import { palette } from '@/styles/theme/colors';

import { MobileNav } from './mobile-nav';
import { UserPopover } from './user-popover';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '@/components/commun/Toast/Toast';
import { setCloseToast } from '@/lib/store/reducer/useGlobalActions';
import { userApis } from '@/lib/user/userApis';

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>(''); // State for search value

  const userPopover = usePopover<HTMLDivElement>();
  const { isOpenToast, message, type } = useSelector((state: any) => state.globalActions);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [profileImage, setProfileImage] = React.useState(null);

  const getImage = React.useCallback(async (type : string): Promise<void> => {
    console.log('here upload');
    const { res, error } = await userApis.getImage(user._id , type);
    
    const blob = new Blob([res.data], { type: 'image/jpeg' });
    console.log({blob})
    const imageUrl = URL.createObjectURL(blob);
    setProfileImage(imageUrl)
    if (error) {
      // dispatch(setOpenToast({message : error, type:'error'}))
      return;
    }
    // dispatch(setOpenToast({message : 'Data Added Successfully', type:'success'}))
    // onClose();
  }, [user]);

  React.useEffect (() => { 
    getImage('PROFILE')
  }, [user])
  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton onClick={() => setOpenNav(true)} sx={{ display: { lg: 'none' } }}>
              <ListIcon />
            </IconButton>

            {/* Search Input with Magnifying Glass Icon on the left */}
            <InputBase
              placeholder="Search for anything..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{
                padding: '12px 16px',
                border: 'none',
                backgroundColor: palette.gray[25],

                borderRadius: '6px',
                flex: 1,
              }}
              startAdornment={
                <InputAdornment position="start">
                  <MagnifyingGlassIcon />
                </InputAdornment>
              }
            />
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Tooltip title="Contacts">
              <ThemeToggle />
            </Tooltip>
            {/*  <Tooltip title="Contacts">
              <IconButton>
                <UsersIcon />
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Notifications">
              <Badge badgeContent={4} color="success" variant="dot">
                <IconButton>
                  <BellIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src={profileImage || "/assets/avatar.png"}
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav onClose={() => setOpenNav(false)} open={openNav} />
      <Toast message={message} open={isOpenToast} type={type} handleClose={() => dispatch(setCloseToast())} />
    </React.Fragment>
  );
}
