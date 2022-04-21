import React from 'react';
import Home from '../../src/screens/Home';
import {create} from 'react-test-renderer';
import ContainerTesting from '../../src/helpers/ReduxTesting';

describe('Group Name', () => {
  test('renders correctly', () => {
    jest.useFakeTimers();
    const tree = create(ContainerTesting(<Home />));
    expect(tree).toMatchSnapshot();
  });
});
