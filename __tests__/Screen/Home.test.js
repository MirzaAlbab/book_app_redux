import React from 'react';
import Home from '../../src/screens/Home';
import {create} from 'react-test-renderer';
import ContainerTesting from '../../src/helpers/ReduxTesting';

describe('Group Name', () => {
  describe('Home', () => {
    it('renders correctly', async () => {
      const tree = create(ContainerTesting(<Home />));
      await expect(tree).toMatchSnapshot();
    });
  });
});

// const tree = create(<Home />);

// test('snapshot', () => {
//   expect(tree).toMatchSnapshot();
// });
