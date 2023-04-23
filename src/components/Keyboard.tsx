import Clubs from "./Clubs"
import Diamonds from "./Diamonds"
import Hearts from "./Hearts"
import Spades from "./Spades"

const Keyboard = ({
  input,
  limit,
  predict,
  handleInputColor,
  handleInputNumber,
  clear,
}: {
  input: any
  limit: any
  predict: any
  handleInputColor: any
  handleInputNumber: any
  clear: any
}) => {
  return (
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
  )
}

export default Keyboard
