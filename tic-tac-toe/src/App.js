import {useState} from 'react';
import './styles.css';

function Square({value, OnSqaureClick}){
  
  return(
    <button className="square" onClick={OnSqaureClick}>
    {value}
    </button>
  );
}
 function Board({xIsNext,sqaures,onPlay}){

  function handleClick(i){
    if(sqaures[i] ||CalculateWinner(sqaures))
    {return;}
    const nextSquares=sqaures.slice();
    if(xIsNext){
      nextSquares[i]="X";
    }
    else{
      nextSquares[i]="O";
    }
     onPlay(nextSquares);
  }

  const winner=CalculateWinner(sqaures);
  let status;
  if(winner){
    status="Winner is "+ winner;
  }
  else{
    status="Next player :" +(xIsNext?"X":"O");
  }
  return(
    <>
    <div className="status">{status}</div>
    <div className='board-row'>
        <Square value={sqaures[0]} OnSqaureClick={()=>handleClick(0)}/>
        <Square value={sqaures[1]} OnSqaureClick={()=>handleClick(1)}/>
        <Square value={sqaures[2]} OnSqaureClick={()=>handleClick(2)}/>
    </div>
     
     <div className='board-row'>
        <Square value={sqaures[3]} OnSqaureClick={()=>handleClick(3)}/>
        <Square value={sqaures[4]} OnSqaureClick={()=>handleClick(4)}/>
        <Square value={sqaures[5]} OnSqaureClick={()=>handleClick(5)}/>
     </div>
     <div className='board-row'>
        <Square value={sqaures[6]} OnSqaureClick={()=>handleClick(6)}/>
        <Square value={sqaures[7]} OnSqaureClick={()=>handleClick(7)}/>
        <Square value={sqaures[8]} OnSqaureClick={()=>handleClick(8)}/>
     </div>
     
    </>
   
  );
}
function CalculateWinner(sqaures){
   const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
   ];
   for(let i=0;i<lines.length;i++){
    const[a,b,c]=lines[i];
    if(sqaures[a]&&sqaures[a]===sqaures[b]&&sqaures[a]===sqaures[c]){
      return sqaures[a];
    }
   }
   return null;
}
export default function Game(){
  // const [xIsNext,setXIsNext]=useState(true);
  const [history,setHistory]=useState([Array(9).fill(null)]); 
  const [currentMove, setCurrentMove]=useState(0);
  const xIsNext=currentMove%2===0;
  const currentSqaures=history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory=[...history.slice(0,currentMove+1),nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
    // setXIsNext(!xIsNext);

  }

  function jumpToMove(nextMove){
   setCurrentMove(nextMove);
  //  setXIsNext(nextMove %2 === 0);
  }
  const moves=history.map((sqaures,move)=>{
    let description;
    if(move>0){
      description='Go to move #'+move;
    }
    else{
      description='Go to start';
    }

    return(
      <li key={move}>
        <button onClick={()=>jumpToMove(move)}>{description}</button>
      </li>
    );
  }
  )
  return(
    <div className='game'>
       <div className='game-board'>
          <Board xIsNext={xIsNext} sqaures={currentSqaures} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
       <ol>{moves}</ol> 
      </div>
    </div>
   
  );
}
