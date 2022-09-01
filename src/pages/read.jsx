import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Divider, Button } from "@mui/material"
import CheckboxList from "../components/checklist"
import NutritionInfo from "../components/nutrition-info"
import defaultRecipeImage from '../assets/default.jpg'
import './page-styles/read.scss'

function Read({ recipe, shoppingList, setShoppingList }) {

    const navigate = useNavigate();

    const validateImageURL = (imageURL) => {
        if (!imageURL) {
            return defaultRecipeImage
        } else return imageURL
    };

    const ingredientArray = recipe.ingredients.split('\n')

    return (
        <div className="read-container">
            <div className="read-header-container">
                <div className="read-image-container">
                    <img className="read-image"
                        src={validateImageURL(recipe.imageURL)}
                        alt={recipe.name}
                    />
                </div>
                <h2 className="recipe-name">{recipe.name}</h2>
            </div>
            <div className="ingredient-method-container">
                <div className="ingredients-container">
                    <h3 className="ingredients-heading">Ingredients</h3>
                    <Divider />
                    <div className="ingredients-content">
                        <CheckboxList ingredientArray={ingredientArray} shoppingList={shoppingList} setShoppingList={setShoppingList} />
                    </div>
                </div>
                <div className="method-container">
                    <h3 className="method-heading">Method</h3>
                    <Divider />
                    <p className="method-content">{recipe.method}</p>
                </div>
            </div>
            <div className="notes-container">
                <h3>Notes:</h3>
                <Divider />
                <p className="notes">{recipe.notes}</p>
            </div>
            <div className="nutrition-container">
                <NutritionInfo />
            </div>
            <div className="read-button-bar">
                <Link to={`/recipes/update/${recipe.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary">Edit</Button>
                </Link>
                <Button onClick={() => navigate(-1)} variant="contained" color="primary">Back</Button>
            </div>
        </div>
    )
}

export default Read