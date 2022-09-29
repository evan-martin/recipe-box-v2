import * as React from 'react';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { styled } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import './component-styles/user-dropdown.scss'

export default function UserDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { logout, user } = useAuth0();




  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = styled((props) => (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      {...props}
    />

  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      minWidth: 100,
      backgroundColor: "#535353",
      color: "white",
      textAlign: "center"
    },
  }));

  return (
    <div>
      {/* <AccountBoxIcon onClick={handleClick} /> */}
      <Avatar alt='user' src={user.picture} sx={{ width: 24, height: 24 }} onClick={handleClick} />
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div className='dropdown'>
          <img src={user.picture} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <div className='logout-button'>
            <Typography onClick={() => logout({ returnTo: window.location.origin })} sx={{ p: 2, cursor: 'pointer' }}>Log out</Typography>
          </div>
        </div>
      </StyledMenu>
    </div>
  );
}
