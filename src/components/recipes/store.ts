import { create } from 'zustand'
import axios from 'axios';
import {Recipe} from '../recipeCard/RecipeType'

interface RecipesStoreI {
    recipes: Recipe[],
    visibleRecipes: Recipe[],
    loading: boolean,
    error: boolean,
    hasMore: boolean,
    fetchRecipes: (pageNumber: number) => void,
    addVisibleRecipes: (visibleRecipes: Recipe[]) => void,
}

const API_URL: string = 'https://api.punkapi.com/v2/beers'

export const useRecipesStore = create<RecipesStoreI>((set) => ({
    recipes: [],
    visibleRecipes: [],
    loading: false,
    error: false,
    hasMore: true,
    fetchRecipes: async (pageNumber) => {
        try {
            set((state) => ({...state, loading: true, error: false}))
            
            const response = await axios.get(`${API_URL}?page=${pageNumber}`)
            const data: Recipe[] = response.data
            data.forEach((recipe: Recipe) => ({...recipe, selected: false}))

            if (data.length === 0) {
                set((state) => ({...state, hasMore: false}))
            }

            set((state) => {
                if(data[0].name !== state.recipes[0]?.name) {
                    return {...state, loading: false, recipes: [...state.recipes, ...data]}
                } else {
                    return {...state, loading: false}
                }
                
            })
        } catch (error) {
            set((state) => ({...state, error: true}))
            console.error('Error:', error)
        }
    },
    addVisibleRecipes: (visibleRecipes: Recipe[]) => {
        set((state) => ({...state, visibleRecipes: [...visibleRecipes]}))
    },
}))