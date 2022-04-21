import React from 'react';
import Login from '../../src/screens/Login';
import {create} from 'react-test-renderer';
import ContainerTesting from '../../src/helpers/ReduxTesting';

describe('Group Name', () => {
  describe('Login', () => {
    it('renders correctly', async () => {
      const tree = create(ContainerTesting(<Login />));
      await expect(tree).toMatchSnapshot();
    });
  });
});
