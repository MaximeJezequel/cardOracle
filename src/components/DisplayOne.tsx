const DisplayOne = ({
  prediction,
  currentStep,
  setCurrentStep,
}: {
  prediction: any
  currentStep: any
  setCurrentStep: any
}) => {
  return (
    <div className="displayone">
      <div className="display-reset">{currentStep}</div>
      <div
        className="display-output"
        onClick={() => setCurrentStep(currentStep + 1)}
      >
        <img src={`/cards/${prediction}.png`} />
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
