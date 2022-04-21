import React from 'react';
import Monserrat from '../../src/components/Monserrat';
import {create} from 'react-test-renderer';

describe('Monserrat Testing', () => {
  describe('Monserrat', () => {
    it('renders correctly', () => {
      const tree = create(<Monserrat />);
      expect(tree).toMatchSnapshot();
    });
    it('renders correctly with props', () => {
      const tree = create(<Monserrat type="Bold" color="red" size={20} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
