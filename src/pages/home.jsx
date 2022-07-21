import RecipeCard from "../components/recipe-card";

function Home({ data, setRecipe }) {

    return (
        <>
            <div>
                {data.map((recipe) => (
                    <div key={recipe._id}>
                        <RecipeCard recipe={recipe} setRecipe={setRecipe} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home