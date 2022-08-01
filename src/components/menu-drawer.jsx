import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function MenuDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250, height: '100%', backgroundColor: "#1e1e1e"}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button >
        </ListItem>
        <Link className="link" to="/" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemText primary={"Home"} style={{ color: "white" }} />
          </ListItem>
        </Link>
        <Link className="link" to="/new-recipe" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemText primary={"New Recipe"} style={{ color: "white" }} />
          </ListItem>
        </Link>

        <Link className="link" to="/shopping-list" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemText primary={"Shopping List"} style={{ color: "white" }} />
          </ListItem>
        </Link>

        <a href="https://github.com/evan-martin/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <ListItem button >
            <ListItemText primary={"GitHub"} style={{ color: "white" }} />
          </ListItem>
        </a>
      </List>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)} />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
