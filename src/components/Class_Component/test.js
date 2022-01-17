import React, {Component} from 'react'

class Square extends Component {
  render() {
    return <button style={{width: 30, height: 30}} onClick={() => this.props.onClick()}>{this.props.value}</button>
  }
}

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice()
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        })
    }  

  renderSquare(i) {
    return <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
    />
  }

  render() {
    const status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
    return (
      <div>
        <div>{status}</div>
        <div>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends Component {
    render(){
        return(
            <div style={{'margin': '30px'}}>
                <div>
                    <Board />
                </div>
            </div>
        )
    }
}
export default Game