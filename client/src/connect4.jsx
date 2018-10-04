import React, { Component } from 'react';
import Row from './row.jsx';

class Connect4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player1Color: "#ff0000",
      player1Wins: 0,
      player2: 2,
      player2Color: "#ffff00",
      player2Wins: 0,
      currentPlayer: 1,
      gameOver: null,
      board: [],
      message: '',
      colorsChosen: false
    };
  }

  handleColorPicker(e, player) {
    if(player === "player1") {
      this.setState({
        player1Color: e.target.value
      });
    } else {
      this.setState({
        player2Color: e.target.value
      });
    }
  } // sets the colors for player 1 and player 2

  handleColorSelected() {
    this.setState({
      colorsChosen: true
    });
  } // Colors selected, set colorsChosen to true for empty board to be rendered.

  handleNewGameButton() {
    (this.state.currentPlayer === 1) ? this.setState({currentPlayer: 1}) : this.setState({currentPlayer: 2});
    this.createEmptyBoard();
  } // NewGame Button makes winner to play piece first and refreshes board

  createEmptyBoard() {
    let board = [];

    for(let rows = 0; rows < 6; rows++) {
      let row = [];
      for(let columns = 0; columns < 7; columns++) {
        row.push(null);
      }
      board.push(row);
    }

    this.setState({
      gameOver: false,
      board,
      message: `Player ${this.state.currentPlayer}'s turn`
    });
  } // Creates an empty board and sets currentPlayer as player 1

  chooseColors() {
    return(
      <div>
        <h1 className="heading"> Connect 4 </h1>
        <div className="modal-color-picker">
          <ul>
            <li><h3> Please select player colors </h3></li>
            <li>Player 1's Color:
              <input className="color" type="color" value={this.state.player1Color} onChange={(e) => this.handleColorPicker(e, "player1")}/>
            </li>
            <li>Player 2's Color:
              <input className="color" type="color" value={this.state.player2Color} onChange={(e) => this.handleColorPicker(e, "player2")}/>
            </li>
            <li>
              <button onClick={this.handleColorSelected.bind(this)}> Save Colors </button>
            </li>
          </ul>
        </div>
        <h1 className="by"> Created by: Darren Chan </h1>
      </div>
    );
  } // Renders color selector Page

  togglePlayerTurn() {
    return (this.state.currentPlayer === this.state.player1) ? this.state.player2 : this.state.player1;
  } // Changes whose turn it is

  checkForWinner(board, row, column) {
    const connect4 = this;

    function checkDirection(direction){
      let count = 0;
      let r = row + direction.row;
      let c = column + direction.column;

      while(r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === connect4.state.currentPlayer) {
        count++;
        r += direction.row;
        c += direction.column;
      }

      return count;
    } // Counts the number of same pieces in direction

    function checkTotal(direction1, direction2) {
      const total = 1 + checkDirection(direction1) + checkDirection(direction2);

      if(total >= 4) {
        return true;
      } else {
        return false;
      }
    } // Counts the total and return a win (true/false)

    function checkVerticals() {
      return checkTotal({row: 1, column: 0}, {row: -1, column: 0});
    } // check Vertical win

    function checkHorizontals() {
      return checkTotal({row: 0, column: 1}, {row: 0, column: -1});
    } // Check Horizontal win

    function checkMajorDiagonal() {
      return checkTotal({row: 1, column: 1}, {row: -1, column: -1});
    } // Check Major Diagonal win

    function checkMinorDiagonal() {
      return checkTotal({row: -1, column: 1}, {row: 1, column: -1});
    } // Check Minor Diagonal win

    function checkDraw(board) {
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
          if (board[r][c] === null) {
            return null;
          }
        }
      }
      return 'draw';    
    } // Check for draw

    return checkVerticals() || checkHorizontals() || checkMajorDiagonal() || checkMinorDiagonal() || checkDraw(board);
  } // Check to see if currentPlayer won

  placePiece(column) {
    if(!this.state.gameOver) {
      let board = this.state.board;
      let rowToCheckForWin = 0;
      let placedPiece = false;
      
      for(let row = 5; row >= 0; row--) {
        if(!board[row][column]) {
          board[row][column] = this.state.currentPlayer;
          rowToCheckForWin = row;
          placedPiece = true;
          break;
        }
      }

      const isWinner = this.checkForWinner(board, rowToCheckForWin, column);

      if(isWinner === true && this.state.currentPlayer === 1) {
        this.setState({board, player1Wins: this.state.player1Wins + 1, gameOver: true, message: `Player 1 has won! Press New Game to play again.`});
      } else if (isWinner === true && this.state.currentPlayer === 2) {
        this.setState({board, player2Wins: this.state.player2Wins + 1, gameOver: true, message: `Player 2 has won! Press New Game to play again.`});
      } else if(isWinner === 'draw') {
        this.setState({board, gameOver: true, message: `DRAW! Press New Game to play again`});
      } else if(placedPiece) {
          let currentPlayer = this.togglePlayerTurn();
          this.setState({ board, currentPlayer, message: `Player ${currentPlayer}'s turn` });
      } else {
        this.setState({message: `Invalid move! Player ${this.state.currentPlayer}'s turn`})
      }
    }
  } // Places player's piece on board

  componentWillMount() {
    this.createEmptyBoard();
  }

  render() {
    return (
      <div>
        {!this.state.colorsChosen ? 
          this.chooseColors()
          :
          <div>
            <div className="heading"> Connect 4 </div>
            <button id="new-game-button" onClick={this.handleNewGameButton.bind(this)}> New Game </button>
            <div className="scoreboard">
              <h3>Scoreboard </h3>
              <span> Player 1's score: {this.state.player1Wins} </span>
              <span> Player 2's score: {this.state.player2Wins} </span>
            </div>
            <table>
              <tbody>
                {this.state.board.map((row, idx) => (<Row key={idx} row={row} placePiece={this.placePiece.bind(this)} colors={{player1: this.state.player1Color, player2: this.state.player2Color}} />))}
              </tbody>
            </table>
            <span className="message"> {this.state.message} </span>
          </div>
        }
      </div>
    );
  }
}

export default Connect4;