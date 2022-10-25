import React from "react"
import { Divider } from "@mui/material"
import CheckboxList from "../components/checklist"
import defaultRecipeImage from '../assets/default.jpg'
import ReadActionBar from "../components/read-action-bar";
import './page-styles/read.scss'

function Read({ recipe, shoppingList, setShoppingList }) {

    const validateImageURL = (imageURL) => {
        if (!imageURL) {
            return defaultRecipeImage
        } else return imageURL
    };

    const ingredientArray = recipe.ingredients.split('\n')

    return (
        <div className="read-container">
            <div className="read-header-container">
                <div className='read-image-title-container'>
                    <div className="read-image-container">
                        <img className="read-image"
                            src={validateImageURL(recipe.imageURL)}
                            alt={recipe.name}
                        />
                    </div>
                    <h2 className="recipe-name">{recipe.name}</h2>
                </div>
                <div className='action-bar-container'>
                    <ReadActionBar recipeID={recipe.id} />
                </div>
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
        </div>
    )
}

export default Read