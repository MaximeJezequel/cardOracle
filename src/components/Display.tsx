const Display = ({
  input,
  prediction,
  erase,
  currentStep,
  setCurrentStep,
}: {
  input: any
  prediction: any
  erase: any
  currentStep: any
  setCurrentStep: any
}) => {
  return (
    <div className="display">
      <div className="display-reset">{currentStep}</div>

      {currentStep % 2 == 1 && (
        <div
          className="display-output"
          onClick={() => setCurrentStep(currentStep + 1)}
        >
          <img src={`/cards/${prediction}.png`} />
        </div>
      )}

      {currentStep % 2 == 0 && input.length > 0 ? (
        <div className="display-input" onClick={() => erase()}>
          {input
            .join()
            .split(",")
            .map((x: any) => (
              <img
                key={x}
                // src={`http://deckofcardsapi.com/static/img/${x}.png`}
                src={`/cards/${x}.png`}
              />
            ))}
        </div>
      ) : (
        <div className="display-input" onClick={() => erase()}></div>
      )}
    </div>
  )
}

export default Display
