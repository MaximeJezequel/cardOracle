import { memo, useState } from "react"

const DisplayOne = memo(
  ({
    prediction,
    currentStep,
    setCurrentStep,
    stack,
    setStack,
    preferences,
  }: {
    prediction: any
    currentStep: number
    setCurrentStep: any
    stack: any
    setStack: any
    preferences: any
  }) => {
    const goToNext = () => {
      if (!isFlipped) setIsFlipped(!isFlipped)
      else {
        setCurrentStep(currentStep + 1)
        switch (currentStep) {
          case 1:
            setStack({
              ...stack,
              stackOne: [...stack.stackOne, prediction],
            })
            break
          case 3:
            setStack({
              ...stack,
              stackTwo: [...stack.stackTwo, ...prediction],
            })
            break
          case 5:
            setStack({
              ...stack,
              stackThree: [...stack.stackThree, ...prediction],
            })
            break
          default:
            break
        }
      }
    }

    const [isFlipped, setIsFlipped] = useState<boolean>(false)

    return (
      <div className="displayone">
        <div className="display-reset">{currentStep}</div>
        <div className="display-output">
          <div className="flip-card">
            <div className={`card ${isFlipped ? "isFlipped" : ""}`}>
              <div className="card-back" onClick={() => goToNext()}>
                <img src={`/cards/${preferences.backDesign}BackDesign.png`} />
              </div>
              <div className="card-front">
                <img src={`/cards/${prediction}.png`} />
              </div>
            </div>
          </div>
        </div>
        {/* <button
        className="cardBtn long"
        onClick={() => setCurrentStep(currentStep + 1)}
      >
        &#62;
      </button> */}
      </div>
    )
  }
)

export default DisplayOne
