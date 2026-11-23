const initialState = {
  recommendedBook: [],
  popularBook: [],
  detailBook: {},
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_BOOKS':
      return initialState;
    case 'SET_BOOK_POPULAR':
      return {
        ...state,

        popularBook: action.payload,
      };
    case 'SET_BOOK_RECOMMENDED':
      return {
        ...state,
        recommendedBook: action.payload,
      };
    case 'SET_BOOK_DETAIL':
      return {
        ...state,
        detailBook: action.payload,
      };

    default:
      return state;
  }
};

export default HomeReducer;
