import { useState } from "react"
import "./App.css"
import Clubs from "./components/Clubs"
import Diamonds from "./components/Diamonds"
import Hearts from "./components/Hearts"
import Spades from "./components/Spades"
import { oracle } from "./utils/oracle"

function App() {
  const [input, setInput] = useState<string[]>([])
  const [limit, setLimit] = useState<number>(4)
  const [currentNumber, setCurrentNumber] = useState<any>("")
  const [currentColor, setCurrentColor] = useState<any>("")
  const [prediction, setPrediction] = useState<any>("")

  const handleInputNumber = (x: any) => {
    if (currentColor) {
      if (
        input.length < limit &&
        [currentColor + x, x + currentColor].every((i) => !input.includes(i))
      ) {
        setInput([...input, currentColor + x])
        setCurrentColor("")
        setCurrentNumber("")
      }
    } else {
      setCurrentNumber(x)
    }
  }

  const handleInputColor = (x: any) => {
    if (currentNumber) {
      if (
        input.length < limit &&
        [currentNumber + x, x + currentNumber].every((i) => !input.includes(i))
      ) {
        setInput([...input, currentNumber + x])
        setCurrentColor("")
        setCurrentNumber("")
      }
    } else {
      setCurrentColor(x)
    }
  }

  const erase = () => {
    setInput([...input].slice(0, -1))
    setCurrentColor("")
    setCurrentNumber("")
  }

  const clear = () => {
    setInput([])
    setCurrentColor("")
    setCurrentNumber("")
    setPrediction("")
    setLimit(4)
  }

  const predict = () => {
    const result = oracle(input)
    setPrediction(result)
    setCurrentColor("")
    setCurrentNumber("")
    setInput([])
    setLimit(limit - 1)
  }

  return (
    <div className="App">
      <div className="display ">
        <div className="display-output">Output: {prediction}</div>
        <div className="display-input" onClick={() => erase()}>
          Input: {input.join()}
        </div>
      </div>
      {/*************************************************************        * TO DO : Change window with each step                        *
       **************************************************************/}

      <div className="keyboard">
        <div className="keyboard-wrap-suit">
          <div className="suitBtn" onClick={() => handleInputColor("S")}>
            <Spades />
          </div>
          <div className="suitBtn" onClick={() => handleInputColor("H")}>
            <Hearts />
          </div>
          <div className="suitBtn" onClick={() => handleInputColor("C")}>
            <Clubs />
          </div>
          <div className="suitBtn" onClick={() => handleInputColor("D")}>
            <Diamonds />
          </div>
          <div className="suitBtn flex-aic-jcc next" onClick={() => clear()}>
            ...
          </div>
        </div>
        <div className="keyboard-wrap-card">
          <button
            className="cardBtn flex-aic-jcc"
            onClick={() => handleInputNumber("A")}
          >
            A
          </button>
          {[, , ...Array(9).keys()].map((x, i) => (
            <button
              className="cardBtn flex-aic-jcc"
              key={x}
              onClick={() => handleInputNumber(i.toString())}
            >
              {i}
            </button>
          ))}
          <button
            className="cardBtn flex-aic-jcc"
            onClick={() => handleInputNumber("J")}
          >
            J
          </button>
          <button
            className="cardBtn flex-aic-jcc"
            onClick={() => handleInputNumber("Q")}
          >
            Q
          </button>
          <button
            className="cardBtn flex-aic-jcc"
            onClick={() => handleInputNumber("K")}
          >
            K
          </button>
          {limit > 2 && (
            <button
              disabled={input.length != limit}
              className="cardBtn flex-aic-jcc long"
              onClick={() => predict()}
            >
              Predict
            </button>
          )}
          {limit == 2 && (
            <button
              // disabled={input.length != limit}
              className="cardBtn flex-aic-jcc long"
              onClick={() => predict()}
            >
              ... Final
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
