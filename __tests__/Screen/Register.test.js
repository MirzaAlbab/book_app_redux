import React from 'react';
import Register from '../../src/screens/Register';
import {create} from 'react-test-renderer';
import ContainerTesting from '../../src/helpers/ReduxTesting';

describe('Group Name', () => {
  describe('Register', () => {
    it('renders correctly', async () => {
      const tree = create(ContainerTesting(<Register />));
      await expect(tree).toMatchSnapshot();
    });
  });
});
