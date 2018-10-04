import React from 'react';

const Square = (props) => {
  const {value, placePiece, columnIdx, colors} = props;
  let color = '#FFF'; // white for empty (null)

  if(value === 1){
    color = colors.player1;
  } else if (value === 2) {
    color = colors.player2;
  }

  return(
    <td>
      <div className="square" onClick={() => {placePiece(columnIdx)}}>
        <div className="piece" style={{backgroundColor: color}}></div>
      </div>
    </td>
  );
}

export default Square;