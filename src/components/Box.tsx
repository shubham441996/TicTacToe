import React from "react";
function Button({
  ele,
  index: [row, column],
  nextState,
  setNextState,
  setState,
  state,
  setWinner,
  winner
}: any) {
  function checkWinner(arr: any, row: number, column: number) {
    const checkColumn = () => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][column] === -1 || arr[0][column] !== arr[i][column]) {
          return false;
        }
      }
      return true;
    };
    const checkRow = () => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[row][i] === -1 || arr[row][0] !== arr[row][i]) {
          return false;
        }
      }
      return true;
    };
    const checkDiagonalLeft = () => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][i] === -1 || arr[0][0] !== arr[i][i]) {
          return false;
        }
      }
      return true;
    };
    const checkDiagonalRight = () => {
      let row = 0;
      for (let i = arr.length; i >= 0; i--) {
        if (arr[row][i] === -1 || arr[row][arr.length - 1] !== arr[row][i]) {
          return false;
        }
        row++;
      }
      return true;
    };
    return (
      checkColumn() || checkRow() || checkDiagonalLeft() || checkDiagonalRight()
    );
  }
  const handleClick = (ev: any) => {
    let arr = [...state];
    arr[row][column] = nextState;
    let isWinner = checkWinner(arr, row, column);
    isWinner && setWinner(nextState);
    setNextState(nextState === "X" ? "0" : "X");
    setState(arr);
  };

  let isDisabled = state[row][column] !== -1 || winner;
  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      style={{ height: "40px", width: "40px", margin: "2px", fontSize: "14px" }}
    >
      {ele === -1 ? "" : ele}
    </button>
  );
}

export default function Box() {
  let initialState = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
  ];
  let [state, setState] = React.useState(initialState);
  let [nextState, setNextState] = React.useState("X");
  let [winner, setWinner] = React.useState("");
  const reset = () => {
    setState(initialState);
    setWinner("");
  };
  React.useEffect(() => {
    let count = 0;
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[0].length; j++) {
        if (state[i][j] === -1) count++;
      }
    }
    if (count === 0) {
      setWinner("-1");
    }
  }, [state]);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {state.map((rowElement, rowIndex) => {
          return (
            <div style={{ display: "flex" }} key={`row-${rowIndex}`}>
              {rowElement.map((ele, index) => {
                return (
                  <Button
                    key={`column-${index}`}
                    index={[rowIndex, index]}
                    ele={ele}
                    nextState={nextState}
                    setState={setState}
                    setNextState={setNextState}
                    state={state}
                    setWinner={setWinner}
                    winner={winner}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {winner && (
        <span
          style={{
            margin: "10px",
            backgroundColor: "green",
            color: "White",
            padding: "5px"
          }}
        >
          {winner !== "-1" ? (
            <>Player {winner} has won this Game</>
          ) : (
            "Reset and play Again"
          )}
        </span>
      )}
      <button style={{ padding: "10px 15px" }} onClick={reset}>
        Reset
      </button>
    </>
  );
}
