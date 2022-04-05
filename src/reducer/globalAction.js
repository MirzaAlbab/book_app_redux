export const setLoading = payload => {
  return {
    type: 'SET_LOADING',
    payload,
  };
};
export const setRefresh = payload => {
  return {
    type: 'SET_REFRESH',
    payload,
  };
};
export const setConnection = payload => {
  return {
    type: 'SET_CONNECT',
    payload,
  };
};
export const setLogout = () => {
  return {
    type: 'SET_LOGOUT',
    payload: '',
  };
};
