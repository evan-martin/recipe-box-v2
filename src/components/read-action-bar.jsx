import * as React from 'react';
import { Link } from "react-router-dom"
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import Fab from "@mui/material/Fab"
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoSleep from "nosleep.js";

import './component-styles/read-action-bar.scss'
import { useEffect } from 'react';

export default function ReadActionBar({ recipeID }) {
    const [checked, setChecked] = React.useState(false);
    const noSleep = new NoSleep();

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            noSleep.enable();
          } else {
            noSleep.disable();
          }
    };

    return (
        <div className="action-bar">
            <div>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                />
                <FormHelperText>Wake Lock</FormHelperText>
            </div>

            <Link to={`/recipes/update/${recipeID}`} style={{ textDecoration: "none" }}>
                <Fab color="secondary" aria-label="edit" size="small">
                    <EditIcon />
                </Fab>
            </Link>

        </div>
    )
}