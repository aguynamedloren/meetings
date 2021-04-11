import {
  LogOut as LogoutIcon,
} from 'react-feather';

import { useDispatch} from 'react-redux';
import allActions from '.././actions'
import { Button, ListItem } from '@material-ui/core';

const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(allActions.userActions.logOut())
  };

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0
      }}
    >
      <Button
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          '& svg': {
            mr: 1
          }
        }}
        onClick={handleClick}
      >
        <LogoutIcon size="20" />
        <span>
          Logout
        </span>
      </Button>
    </ListItem>
  );
};

export default LogoutButton;
