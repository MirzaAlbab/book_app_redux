import React from 'react';
import {Text} from 'react-native';
// import {ms} from 'react-native-size-matters';

const Monserrat = ({
  type = 'Regular',
  children,
  color = 'black',
  size = 12,
  ...style
}) => {
  return (
    <Text
      style={{
        fontFamily: `Montserrat-${type}`,
        color: color,
        fontSize: size,
        ...style,
      }}>
      {children}
    </Text>
  );
};
export default Monserrat;
