import React from 'react';
import Register from '../../src/screens/Register';
import {create} from 'react-test-renderer';
import ContainerTesting from '../../src/helpers/ReduxTesting';

describe('Group Name', () => {
  test('renders correctly', () => {
    jest.useFakeTimers();
    const tree = create(ContainerTesting(<Register />));
    expect(tree).toMatchSnapshot();
  });
});
