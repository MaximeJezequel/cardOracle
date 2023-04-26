const Display = ({
  input,
  erase,
  currentStep,
}: {
  input: any
  erase: any
  currentStep: any
}) => {
  return (
    <div className="display">
      <div className="display-reset">{currentStep}</div>
      {input.length > 0 ? (
        <div className="display-input" onClick={() => erase()}>
          {input
            .join()
            .split(",")
            .map((x: any) => (
              <img key={x} src={`/cards/${x}.png`} />
            ))}
        </div>
      ) : (
        <div className="display-input" onClick={() => erase()}></div>
      )}
    </div>
  )
}

export default Display
