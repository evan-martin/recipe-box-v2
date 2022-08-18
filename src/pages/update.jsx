import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { TextField, MenuItem, Button } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import DeleteModal from '../components/delete-modal';
import './page-styles/create-update.scss'

function Update({ recipe, setRecipe }) {
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();
    

    const handleUpdate = (event) => {
        event.preventDefault();
        let name = event.target.elements.name.value;
        let imageURL = event.target.elements.imageURL.value;
        let ingredients = event.target.elements.ingredients.value;
        let method = event.target.elements.method.value;
        let notes = event.target.elements.notes.value;
        setRecipe({
            ...recipe, 'name': name,
            'imageURL': imageURL,
            'ingredients': ingredients,
            'method': method,
            'notes': notes,
        });

        (async () => {
            try {
                console.log(recipe._id)
                const accessToken = await getAccessTokenSilently();
                axios.put("https://recipe-api-authorized.herokuapp.com/api/recipes/update",
                    {
                        name: name,
                        imageURL: imageURL,
                        ingredients: ingredients,
                        method: method,
                        notes: notes,

                    }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        user: user.email,
                        recipe: recipe._id,
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
                <form onSubmit={handleUpdate}>

                    <div className='name-container'>
                        <TextField
                            id="name"
                            margin="normal"
                            label="Name"
                            variant="outlined"
                            type="text"
                            name="name"
                            defaultValue={recipe.name}
                        />
                    </div>

                    <TextField
                        select
                        id="category"
                        label="Category"
                        variant="outlined"
                        size="medium"
                        helperText="Select a category"
                        name="category"
                        defaultValue={recipe.category}
                    >
                        <MenuItem value="pasta" >Pasta</MenuItem>
                        <MenuItem value="chicken" >Chicken</MenuItem>
                        <MenuItem value="soup" >Soup</MenuItem>
                        <MenuItem value="rice" >Rice & Grains</MenuItem>
                        <MenuItem value="baking" >Bread & Baking</MenuItem>
                        <MenuItem value="booze" >Booze</MenuItem>
                        <MenuItem value="dessert" >Dessert</MenuItem>
                    </TextField>

                    <TextField
                        id="imageURL"
                        margin="normal"
                        label="Image Url"
                        fullWidth
                        variant="outlined"
                        type="text"
                        name="imageURL"
                        defaultValue={recipe.imageURL}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Ingredients"
                        type="text"
                        name="ingredients"
                        multiline
                        rows={20}
                        variant="outlined"
                        defaultValue={recipe.ingredients}
                    />

                    <TextField
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
                        <DeleteModal recipe_id={recipe._id} />

                        <div className='button-group'>
                            <Button onClick={() => navigate(-1)} variant="contained" color="secondary">Cancel</Button>
                            <Button type="submit" variant="contained">Update</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Update