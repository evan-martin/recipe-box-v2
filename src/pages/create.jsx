import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import CustomInput from '../components/custom-input';
import ErrorAlert from '../components/error-alert';
import UploadWidget from '../components/image-upload';
import LoadingButton from '@mui/lab/LoadingButton';
import { ObjectID } from 'bson';

function Create({ recipes, setRecipes }) {
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');
    const [loading, setLoading] = React.useState(false);

    const handleCreate = () => {
        setLoading(true);
        const name = document.getElementById('name').value;
        const imageURL = url;
        const ingredients = document.getElementById('ingredients').value;
        const method = document.getElementById('method').value;
        const notes = document.getElementById('notes').value;
        const tag = document.getElementById('tag').value;
        const newRecipe = {
            'id': new ObjectID().toString(),
            'name': name,
            'imageURL': imageURL,
            'ingredients': ingredients,
            'method': method,
            'notes': notes,
            'tag': " " + tag,
        };

        setRecipes([...recipes, newRecipe]);

        (async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                axios.put("https://34rz1edov8.execute-api.us-west-1.amazonaws.com/recipes", newRecipe, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        user: user.email
                    },
                }).then(() => {
                    navigate("/recipes");
                });
            } catch (error) {
            }
        })();

    }

    const handleScrape = () => {
        setLoading(true);
        const url = document.getElementById('url').value;

        if (url) {
            (async () => {
                try {
                    const accessToken = await getAccessTokenSilently();
                    axios.post("https://34rz1edov8.execute-api.us-west-1.amazonaws.com/import", { url }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            user: user.email
                        },
                    }).then((res) => {
                        setLoading(false)
                        if (res.data.error) {
                            setOpen(true)
                        } else {
                            document.getElementById('name').value = res.data.name
                            document.getElementById('imageURL').value = res.data.imageURL
                            document.getElementById('tag').value = res.data.tag
                            document.getElementById('ingredients').value = res.data.ingredients.join("\n")
                            document.getElementById('method').value = res.data.method.join("\n")
                            setUrl(document.getElementById('imageURL').value)
                        }
                    });
                } catch (error) {
                }
            })();

        } else {
            setLoading(false)
        }
    }

    return (

        <div className='form-container'>
            <div className='form-content'>
                <h2>New Recipe</h2>
                <form className='import-bar'>
                    <CustomInput
                        fullWidth
                        id="url"
                        margin="normal"
                        label="Import Recipe"
                        type="text"
                        name="url"
                        focused
                        placeholder='Paste Recipe URL Here'
                    />
                    <ErrorAlert open={open} setOpen={setOpen} />
                    <LoadingButton variant='contained' loading={loading} onClick={() => handleScrape()}>Import</LoadingButton>
                </form>
                <form>
                    <div className='name-container'>
                        <CustomInput
                            fullWidth
                            id="name"
                            margin="normal"
                            label="Name"
                            type="text"
                            name="name"
                            required={true}
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
                            onChange={event => setUrl(event.target.value)}
                        />
                        <img className='image-preview' src={url} alt='Preview:' />
                    </div>

                    <CustomInput
                        id="tag"
                        margin="normal"
                        fullWidth
                        label="Search Tags"
                        type="text"
                        name="tag"
                        variant="outlined"
                        focused
                        placeholder='Add Tags separated by commas to make searching easier (eg apps, desert, bbq, etc...)'
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
                        required={true}
                    />

                    <CustomInput
                        id='method'
                        margin="normal"
                        fullWidth
                        label="Method"
                        type="text"
                        name="method"
                        multiline
                        rows={20}
                        variant="outlined"
                        focused
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
                    />

                    <div className='button-bar' >
                        <Link to={`/`} style={{ textDecoration: "none" }}>
                            <Button variant="contained" color='error'>Cancel</Button>
                        </Link>
                        <LoadingButton variant="contained" loading={loading} onClick={() => handleCreate()}>Create</LoadingButton>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Create