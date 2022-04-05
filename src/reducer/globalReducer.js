const initialState = {
  loading: false,
  refreshing: false,
  connection: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_REFRESH':
      return {
        ...state,
        refreshing: action.payload,
      };
    case 'SET_CONNECT':
      return {
        ...state,
        connection: action.payload,
      };
    case 'SET_LOGOUT':
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};
