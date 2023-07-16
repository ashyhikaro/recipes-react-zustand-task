import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom'
import { useState } from 'react'

import { RecipesPage } from './components/recipes/Recipes.page';
import { RecipePage } from './components/recipe/Recipe.page';
import { Recipe } from './components/recipeCard/RecipeType';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  return (
    <div className="App">
      <HashRouter>
        <Routes>
            <Route path='/' element={<RecipesPage setSelectedRecipe={setSelectedRecipe} />} />
            <Route path='/recipe_details' element={<RecipePage selectedRecipe={selectedRecipe} />} />
        </Routes>
      </HashRouter>
    </div>
    
  );
}

export default App;