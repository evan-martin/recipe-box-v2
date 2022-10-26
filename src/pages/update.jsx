import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Button } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import DeleteModal from '../components/delete-modal';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadWidget from '../components/image-upload';
import CustomInput from '../components/custom-input';
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
                        <CustomInput
                            fullWidth
                            id="name"
                            margin="normal"
                            label="Name"
                            variant="outlined"
                            type="text"
                            name="name"
                            defaultValue={recipe.name}
                            required={true}
                            focused
                        />
                    </div>

                    <div className='image-container'>
                        <UploadWidget setUrl={setUrl} />
                        <CustomInput
                            id="imageURL"
                            margin="normal"
                            label="Image Url"
                            fullWidth
                            variant="outlined"
                            type="text"
                            name="imageURL"
                            focused
                            placeholder='Upload Image or Copy and Paste URL Here'
                            defaultValue={recipe.imageURL}
                            onChange={event => setUrl(event.target.value)}
                        />

                        <img className='image-preview' src={url} alt='Preview:' />
                    </div>

                    <CustomInput
                        id="tags"
                        margin="normal"
                        label="Tags"
                        fullWidth
                        variant="outlined"
                        type="text"
                        name="tags"
                        focused
                        placeholder='Add Tags separated by commas to make searching easier (eg apps, desert, bbq, etc...)'
                        defaultValue={recipe.tag}
                    />

                    <CustomInput
                        id="ingredients"
                        margin="normal"
                        fullWidth
                        label="Ingredients"
                        type="text"
                        name="ingredients"
                        multiline
                        rows={20}
                        variant="outlined"
                        focused
                        placeholder='Enter Ingredients One Per Line'
                        defaultValue={recipe.ingredients}
                        required={true}
                    />

                    <CustomInput
                        id="method"
                        margin="normal"
                        fullWidth
                        label="Method"
                        type="text"
                        name="method"
                        multiline
                        rows={20}
                        variant="outlined"
                        focused
                        defaultValue={recipe.method}
                    />

                    <CustomInput
                        id="notes"
                        margin="normal"
                        fullWidth
                        label="Notes"
                        type="text"
                        name="notes"
                        multiline
                        rows={10}
                        variant="outlined"
                        focused
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