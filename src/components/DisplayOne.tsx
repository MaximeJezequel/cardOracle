import { useState } from "react"

const DisplayOne = ({
  prediction,
  currentStep,
  setCurrentStep,
  stack,
  setStack,
  favBackDesign,
}: {
  prediction: any
  currentStep: number
  setCurrentStep: any
  stack: any
  setStack: any
  favBackDesign: string
}) => {
  const goToNext = () => {
    if (!isFlipped) setIsFlipped(!isFlipped)
    else {
      setCurrentStep(currentStep + 1)
      if (currentStep === 1)
        setStack({
          ...stack,
          stackOne: [...stack.stackOne, prediction],
        })
      if (currentStep === 3)
        setStack({
          ...stack,
          stackTwo: [...stack.stackTwo, ...prediction],
        })
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
              <img src={`/cards/${favBackDesign}BackDesign.png`} />
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

export default DisplayOne
