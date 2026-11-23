import axios from 'axios';
import {getAllBook, getDetailBook} from '../../src/screens/Home/redux/action';
import {setLogoutAction} from '../../src/screens/Login/redux/action';
import {sortBook} from '../../src/helpers/Sortbook';

jest.mock('axios');
jest.mock('../../src/helpers/Navigasi', () => ({navigate: jest.fn()}));

const run = async (action, token = '') => {
  const dispatch = jest.fn();
  await action(dispatch, () => ({login: {token}}));
  return dispatch;
};

beforeEach(() => jest.clearAllMocks());

test('book requests use the current login token on each request', async () => {
  axios.get.mockResolvedValue({status: 200, data: {results: []}});

  await run(getAllBook(), 'first-token');
  await run(getAllBook(), 'second-token');

  expect(axios.get.mock.calls[0][1].headers).toEqual({
    Authorization: 'Bearer first-token',
  });
  expect(axios.get.mock.calls[1][1].headers).toEqual({
    Authorization: 'Bearer second-token',
  });
  expect(axios.defaults.headers.Authorization).toBeUndefined();
});

test('detail requests omit Authorization after logout', async () => {
  axios.get.mockResolvedValue({status: 200, data: {id: 4}});
  await run(getDetailBook(4));
  expect(axios.get.mock.calls[0][1].headers).toEqual({});
});

test('a response from a previous account cannot restore its catalog', async () => {
  let finishRequest;
  axios.get.mockReturnValue(
    new Promise(resolve => {
      finishRequest = resolve;
    }),
  );
  const dispatch = jest.fn();
  let token = 'first-token';
  const request = getAllBook()(dispatch, () => ({login: {token}}));
  token = '';
  finishRequest({status: 200, data: {results: [{id: 1}]}});
  await request;

  expect(dispatch.mock.calls.map(([action]) => action.type)).toEqual([
    'SET_LOADING',
    'SET_LOADING',
  ]);
});

test('logout clears persisted account and book data', () => {
  const dispatch = jest.fn();
  setLogoutAction()(dispatch);
  expect(dispatch.mock.calls.map(([action]) => action.type)).toEqual([
    'SET_TOKEN',
    'SET_USER',
    'CLEAR_BOOKS',
  ]);
});

test('recommendation sorting does not change the catalog order', () => {
  const books = [
    {id: 1, average_rating: 2},
    {id: 2, average_rating: 5},
  ];
  expect(sortBook(books, 1)).toEqual([{id: 2, average_rating: 5}]);
  expect(books.map(book => book.id)).toEqual([1, 2]);
});
