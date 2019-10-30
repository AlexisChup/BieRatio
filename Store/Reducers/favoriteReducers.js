const initialState = { favoritesBeers: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteBeerIndex = state.favoritesBeers.findIndex(item => item.bid === action.value.bid)
      if (favoriteBeerIndex !== -1) {
        nextState = {
          ...state,
          favoritesBeers: state.favoritesBeers.filter( (item, index) => index !== favoriteBeerIndex)
        }
      }
      else {
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