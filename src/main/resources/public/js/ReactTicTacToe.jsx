const {
  colors,
  Button,
  CssBaseline,
  ThemeProvider,
  Typography,
  TextField,
  Container,
  makeStyles,
  createMuiTheme,
  Box,
  SvgIcon,
  Link,
  Grid,
  spacing
} = MaterialUI;

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#19857b",
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: "#FF3333",
    },
  },
});

function Square(props) {
  return (
    <Button
      className="square"
      onClick={props.onClick}
      variant="outlined"
      color="secondary"
      size="small"
    >
      {props.value}
    </Button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      idSala: "",
      salaState: false,
      sbOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  handleChangeState(e) {
    this.setState({ [e.target.name]: !this.state.salaState });
    console.log(this.state.salaState);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleCreateButton(e) {
    this.setState({
      sbOpen: true,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "MOVE #" + move : "GAME START";
      return (
        <li key={move}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </Button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "WINNER: " + winner;
    } else {
      status = "NEXT PLAYER: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
            <div className="flex-with-center">
                <Typography variant="h4" gutterBottom>
                    TIC TAC TOE REACT
                </Typography>
                ROOM IDENTIFIER: {this.state.idSala}
            </div>
        </Grid>
        <Grid item xs={12} md={6}>
            <div className="game">
              <div className="game-board">
                <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                />
              </div>
              
            </div>
            <div className="bottom-container mt-20px">
              <TextField
                variant="outlined"
                margin="auto"
                color="secondary"
                required
                id="idSala"
                label="ID ROOM"
                name="idSala"
                autoComplete="idSala"
                autoFocus
                value={this.state.idSala}
                onChange={this.handleChange}
              />
              <div>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  name="salaState"
                  fullWidth="true"
                  value={this.state.salaState}
                  onClick={this.handleCreateButton}
                  className="mt-20px"
                >
                  CREATE
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  name="salaState"
                  fullWidth="true"
                  value={this.state.salaState}
                  onClick={this.handleChangeState}
                  className="mt-20px"
                >
                  GET IN
                </Button>
              </div>
            </div>
        </Grid>
        <Grid item xs={12} md={6}>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </Grid>
      </Grid>
    );
  }
}

// ========================================

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Game />
  </ThemeProvider>,
  document.getElementById("root")
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
