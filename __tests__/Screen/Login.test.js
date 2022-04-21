import React from 'react';
import Login from '../../src/screens/Login';
import {create} from 'react-test-renderer';
import ContainerTesting from '../../src/helpers/ReduxTesting';

describe('Group Name', () => {
  test('renders correctly', () => {
    const tree = create(ContainerTesting(<Login />));
    expect(tree).toMatchSnapshot();
  });
});
