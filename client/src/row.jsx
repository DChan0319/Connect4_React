import React from 'react';
import Square from './square.jsx';

const Row = (props) => {
  const {row, placePiece, colors} = props;
  return(
    <tr>
      {row.map((square, idx) => <Square key={idx} value={square} columnIdx={idx}placePiece={placePiece} colors={colors}/>)}
    </tr>
  );
}

export default Row;