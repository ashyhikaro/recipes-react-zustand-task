import { useEffect } from 'react'
import { useRecipesStore } from "../recipes/store"

export default function useGetRecipes(pageNumber: number) {
    const fetchRecipes = useRecipesStore(state => state.fetchRecipes)

    useEffect(() => {
        fetchRecipes(pageNumber)
    }, [pageNumber])
    
    return null
}