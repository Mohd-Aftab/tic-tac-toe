import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'

function getGameStatus(squares){
    let winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for(let i=0; i<winCombos.length; i++){
        let wins = winCombos[i];
        let s1 = wins[0];
        let s2 = wins[1];
        let s3 = wins[2];

        if(squares[s1] != null && squares[s1] == squares[s2] && squares[s2] == squares[s3]){
            return squares[s1]; 
        }
    }
    return null;
}

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

    moveToHistory(i){
        this.props.handleForHistory(i);
    }

    render(){
        let gameTitle;


        if(this.props.gameStatus != null){
            gameTitle = this.props.gameStatus + " Wins";
        }else{
            gameTitle = "Next move for " + (this.props.stepNumber % 2 == 0 ? 'X' : 'O');
        }

        let buttons = [];
        for(let i=0; i<=this.props.stepNumber; i++){
            let button = null;
            if(i == 0){
                button = (<button onClick={()=>this.moveToHistory(i)}>Go to Start</button>)
            }else{
                button = (<button onClick={()=>this.moveToHistory(i)}>Go to step number{i}</button>)
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
                // [0, 1, 2, 3, 4, 5, 6, 7, 8]
            ],
            stepNumber : 0,
            gameStatus : null
        }
    }
    handleSquareClick(i){
        let oldHistory = this.state.history.slice();
        let lastStateOfSquare = oldHistory[oldHistory.length-1].slice();
        if(lastStateOfSquare[i] != null || this.state.gameStatus != null){
            return;
        }
        lastStateOfSquare[i] = this.state.stepNumber%2 == 0 ? 'X' : "O";
        oldHistory.push(lastStateOfSquare);

        let newGameStatus = getGameStatus(lastStateOfSquare);

        this.setState({
            history : oldHistory,
            stepNumber : this.state.stepNumber+1,
            gameStatus : newGameStatus
        })
    }
    moveToStep(i){
        let oldHistory = this.state.history.slice(0, i+1);
        let lastStateOfSquare = oldHistory[oldHistory.length-1].slice();
        let newGameStatus = getGameStatus(lastStateOfSquare);
        this.setState({
            history: oldHistory,
            stepNumber:i,
            gameStatus:newGameStatus
        })
    }
    render(){

        let squares = this.state.history[this.state.history.length-1]; 
        return (
            <>
                <Board handleSquareClick={(i)=> this.handleSquareClick(i)} boxes={squares}/>
                <Display handleForHistory = {(i)=>this.moveToStep(i)} stepNumber = {this.state.stepNumber} gameStatus={this.state.gameStatus}/>
            </>
        )
    }
}
ReactDOM.render(<TTT/>, document.getElementById('root'));