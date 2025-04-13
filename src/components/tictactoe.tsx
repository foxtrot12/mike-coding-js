import { memo, useEffect, useState } from "react";

function TicTacToe() {
  const [scoreMatrix, setScoreMatrix] = useState<Array<Array<TileValue>>>(
    getEmptyScoreMatrix()
  );

  const [turn, setTurn] = useState<"X" | "O">("X");

  function onTileClick(row: number, col: number) {
    if (scoreMatrix[row][col] !== "") return;

    setScoreMatrix((prev) => {
      const newMatrix = [...prev];
      newMatrix[row][col] = turn;

      return newMatrix;
    });
    setTurn((prev) => {
      if (prev === "O") return "X";
      else return "O";
    });
  }

  function checkWinner(): "X" | "O" | "" {
    // Check rows for a win.
    for (let i = 0; i < 3; i++) {
      if (
        scoreMatrix[i][0] !== "" &&
        scoreMatrix[i][0] === scoreMatrix[i][1] &&
        scoreMatrix[i][1] === scoreMatrix[i][2]
      ) {
        return scoreMatrix[i][0];
      }
    }

    // Check columns for a win.
    for (let i = 0; i < 3; i++) {
      if (
        scoreMatrix[0][i] !== "" &&
        scoreMatrix[0][i] === scoreMatrix[1][i] &&
        scoreMatrix[1][i] === scoreMatrix[2][i]
      ) {
        return scoreMatrix[0][i];
      }
    }

    // Check the main diagonal for a win.
    if (
      scoreMatrix[0][0] !== "" &&
      scoreMatrix[0][0] === scoreMatrix[1][1] &&
      scoreMatrix[1][1] === scoreMatrix[2][2]
    ) {
      return scoreMatrix[0][0];
    }

    // Check the anti-diagonal for a win.
    if (
      scoreMatrix[0][2] !== "" &&
      scoreMatrix[0][2] === scoreMatrix[1][1] &&
      scoreMatrix[1][1] === scoreMatrix[2][0]
    ) {
      return scoreMatrix[0][2];
    }

    // No winner found.
    return "";
  }

  function getEmptyScoreMatrix(): Array<Array<TileValue>> {
    return [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  useEffect(() => {
    const winner = checkWinner();

    if (winner === "") {
    } else {
      window.alert(`Winner is ${winner}`);
      setScoreMatrix(getEmptyScoreMatrix());
      setTurn(winner)
    }
  }, [scoreMatrix]);
  return (
    <main>
      <div className="w-1/2 grid-cols-3 grid gap-2">
        {scoreMatrix.map((val, row) =>
          val.map((value, col) => (
            <button
              key={col}
              onClick={() => onTileClick(row, col)}
              className="w-full h-6 rounded-lg border-grey border-2 cursor-pointer items-center flex justify-center"
            >
              {value}
            </button>
          ))
        )}
      </div>
    </main>
  );
}

export default memo(TicTacToe);

type TileValue = "X" | "O" | "";
