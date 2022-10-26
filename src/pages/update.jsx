import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { TextField, Button } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import DeleteModal from '../components/delete-modal';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadWidget from '../components/image-upload';
import './page-styles/create-update.scss'

function Update({ recipe, setRecipe, recipes, setRecipes }) {
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState(recipe.imageURL);

    const handleUpdate = () => {
        setLoading(true);
        const index = recipes.findIndex(recipe => recipe.id === id);
        let name = document.getElementById('name').value;
        let imageURL = document.getElementById('imageURL').value;
        let ingredients = document.getElementById('ingredients').value;
        let method = document.getElementById('method').value;
        let notes = document.getElementById('notes').value;
        let tags = document.getElementById('tags').value;
        const updatedRecipe = {
            'id': recipe.id,
            'name': name,
            'imageURL': imageURL,
            'ingredients': ingredients,
            'method': method,
            'notes': notes,
            'tag': " " + tags,
        };

        setRecipe(updatedRecipe);
        setRecipes(Object.assign([], recipes, { [index]: updatedRecipe }));

        (async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                axios.put("https://34rz1edov8.execute-api.us-west-1.amazonaws.com/recipes",
                    updatedRecipe, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        user: user.email,
                    },
                }).then(() => {
                    navigate(-1)
                });

            } catch (error) {
            }
        })();
    }

    return (
        <div className='form-container'>
            <div className='form-content'>
                <h2>Editing {recipe.name}</h2>
                <form >

                    <div className='name-container'>
                        <TextField
                            id="name"
                            margin="normal"
                            label="Name"
                            variant="outlined"
                            type="text"
                            name="name"
                            defaultValue={recipe.name}
                            required={true}
                        />
                    </div>

                    <UploadWidget setUrl={setUrl} />
                    
                    <p>Or Copy & Paste URL:</p>
                    <TextField
                        id="imageURL"
                        margin="normal"
                        label="Image Url"
                        fullWidth
                        variant="outlined"
                        type="text"
                        name="imageURL"
                        defaultValue={recipe.imageURL}
                        onChange={event => setUrl(event.target.value)}
                    />

                    <img className='image-preview' src={url} alt='Preview:' />

                    <TextField
                        id="tags"
                        margin="normal"
                        label="Tags"
                        fullWidth
                        variant="outlined"
                        type="text"
                        name="tags"
                        defaultValue={recipe.tag}
                    />

                    <TextField
                        id="ingredients"
                        margin="normal"
                        fullWidth
                        label="Ingredients"
                        type="text"
                        name="ingredients"
                        multiline
                        rows={20}
                        variant="outlined"
                        defaultValue={recipe.ingredients}
                        required={true}
                    />

                    <TextField
                        id="method"
                        margin="normal"
                        fullWidth
                        label="Method"
                        type="text"
                        name="method"
                        multiline
                        rows={20}
                        variant="outlined"
                        defaultValue={recipe.method}
                    />

                    <TextField
                        id="notes"
                        margin="normal"
                        fullWidth
                        label="Notes"
                        type="text"
                        name="notes"
                        multiline
                        rows={10}
                        variant="outlined"
                        defaultValue={recipe.notes}
                    />
                    <div className='button-bar'>
                        <DeleteModal recipe={recipe} recipes={recipes} setRecipes={setRecipes} />

                        <div className='button-group'>
                            <Button onClick={() => navigate(-1)} variant="contained" color="secondary">Cancel</Button>
                            <LoadingButton variant="contained" loading={loading} onClick={() => handleUpdate()}>Update</LoadingButton>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Update