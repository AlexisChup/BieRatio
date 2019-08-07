const initialState = { favoritesBeers: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteBeerIndex = state.favoritesBeers.findIndex(item => item.bid === action.value.bid)
      if (favoriteBeerIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesBeers: state.favoritesBeers.filter( (item, index) => index !== favoriteBeerIndex)
        }
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesBeers: [...state.favoritesBeers, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite