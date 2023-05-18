import { memo } from "react"
import Clubs from "../pips/Clubs"
import Diamonds from "../pips/Diamonds"
import Hearts from "../pips/Hearts"
import Spades from "../pips/Spades"

const KeyboardLeft = memo(
  ({
    input,
    limit,
    predict,
    finalPredict,
    currentStep,
    handleInputColor,
    handleInputNumber,
    clear,
  }: {
    input: any
    limit: any
    predict: any
    finalPredict: any
    currentStep: any
    handleInputColor: any
    handleInputNumber: any
    clear: any
  }) => {
    return (
      <div className="keyboard">
        {currentStep % 2 === 0 && (
          <div className="keyboard-wrap-suit">
            <div
              className="suitBtn"
              onClick={() => handleInputColor("S")}
              tabIndex={0}
            >
              <Spades />
            </div>
            <div
              className="suitBtn"
              onClick={() => handleInputColor("H")}
              tabIndex={0}
            >
              <Hearts />
            </div>
            <div
              className="suitBtn"
              onClick={() => handleInputColor("C")}
              tabIndex={0}
            >
              <Clubs />
            </div>
            <div
              className="suitBtn"
              onClick={() => handleInputColor("D")}
              tabIndex={0}
            >
              <Diamonds />
            </div>
            <div
              className="cardBtn flex-aic-jcc next"
              onClick={() => clear()}
              tabIndex={0}
            >
              .{currentStep > 1 ? "." : <span>&nbsp;</span>}
              {currentStep > 3 ? "." : <span>&nbsp;</span>}
            </div>
          </div>
        )}
        {currentStep % 2 === 0 && (
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
            {limit > 1 && (
              <button
                disabled={input.length != limit}
                className="cardBtn flex-aic-jcc long"
                onClick={() => predict()}
              >
                Predict
              </button>
            )}
            {limit === 1 && (
              <button
                // disabled={input.length != limit}
                className="cardBtn flex-aic-jcc long"
                onClick={() => finalPredict()}
              >
                ... Final
              </button>
            )}
          </div>
        )}
      </div>
    )
  }
)

export default KeyboardLeft
