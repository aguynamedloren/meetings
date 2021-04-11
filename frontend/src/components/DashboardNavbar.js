import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => (
  <AppBar
    elevation={0}
    {...rest}
  >
    <Toolbar>
      <RouterLink to="/">
        <IconButton
          sx={{
            color: 'primary.contrastText',
          }}
        >
          <HomeIcon />
        </IconButton>

      </RouterLink>
      <Box sx={{ flexGrow: 1 }} />
      <Hidden lgUp>
        <IconButton
          color="inherit"
          onClick={onMobileNavOpen}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>
);

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
