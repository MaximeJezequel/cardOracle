const Prediction = ({ prediction }: { prediction: any }) => {
  return (
    <div className="display-output">
      <img src={`http://deckofcardsapi.com/static/img/${prediction}.png`} />
      <button>Next</button>
    </div>
  )
}

export default Prediction
