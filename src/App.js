import React, { useState } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Pixel from './Pixel';
import ColorPicker from './ColorPicker';

const GET_PIXELS = gql`
  subscription GetPixels {
    pixels(order_by: { id: asc }) {
      color
      id
    }
  }
`;

// const pixels = new Array(400).fill('white');

function App() {
  const { loading, error, data } = useSubscription(GET_PIXELS);
  const [color, changeColor] = useState('white');
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <div className="logo">Draw</div>
      <p>Pick a Color</p>
      <ColorPicker changeColor={changeColor} />
      <p>Click a Pixel</p>
      <div className="container">
        {data.pixels.map(pixel => (
          <Pixel {...pixel} key={pixel.id} newColor={color} />
        ))}
      </div>
    </div>
  );
}

export default App;
