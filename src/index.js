import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'

class Board extends React.Component{
    handlerBoxesClick(i){
        this.props.handleSquareClick(i);
    }
    renderBoxes(i){
        return (
            <button onClick={()=>this.handlerBoxesClick(i)}>{this.props.boxes[i] == null ? '' : this.props.boxes[i]}</button>
        )
    }
    render(){
        return (
            <div className='board'>
                <div className='title'>
                    Tic Tac Toe
                </div>
                <div className='content'>
                    <div className='ttt'>
                        <div className='row'>
                            {this.renderBoxes(0)}
                            {this.renderBoxes(1)}
                            {this.renderBoxes(2)}
                        </div>
                        <div className='row'>
                            {this.renderBoxes(3)}
                            {this.renderBoxes(4)}
                            {this.renderBoxes(5)}
                        </div>
                        <div className='row'>
                            {this.renderBoxes(6)}
                            {this.renderBoxes(7)}
                            {this.renderBoxes(8)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Display extends React.Component{
    render(){
        let gameTitle = null;

        if(this.props.gameStatus != null){
            gameTitle = this.props.gameStatus;
        }else{
            if(this.props.stepNumber % 2 == 0){
                gameTitle = 'Next move for X';
            }else{
                gameTitle = 'Next move for O';
            }
        }

        let buttons = [];
        for(let i=0; i<=this.props.stepNumber; i++){
            let button = null;
            if(i == 0){
                button = (<button>Go to Start</button>)
            }else{
                button = (<button>Go to step number{i}</button>)
            }
            buttons.push(button)
        }

        return (
            <div className='display'>
                <div className='title'>
                    {gameTitle}
                </div>
                <div className='content'>
                    <div className='history'>
                       {buttons}
                    </div>
                </div>
            </div>
        )
    }
}

class TTT extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            history : [
                [null, null, null, null, null, null, null, null, null]
            ],
            stepNumber : 0,
            gameStatus : null
        }
    }
    handleSquareClick(i){
        let oldHistory = this.state.history.slice();
        let lastStateOfSquare = oldHistory[oldHistory.length-1].slice();
        if(lastStateOfSquare[i] != null){
            return;
        }
        lastStateOfSquare[i] = this.state.stepNumber%2 == 0 ? 'X' : "O";
        oldHistory.push(lastStateOfSquare);

        this.setState({
            history : oldHistory,
            stepNumber : this.state.stepNumber+1,
            gameStatus : null
        })
    }
    render(){

        let squares = this.state.history[this.state.history.length-1];
        return (
            <>
                <Board handleSquareClick={(i)=> this.handleSquareClick(i)} boxes={squares}/>
                <Display stepNumber = {this.state.stepNumber} gameStatus={this.state.gameStatus}/>
            </>
        )
    }
}
ReactDOM.render(<TTT/>, document.getElementById('root'));