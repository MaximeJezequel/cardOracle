import { useState } from "react"
import "./App.scss"
import Display from "./components/Display"
import DisplayOne from "./components/DisplayOne"
import KeyboardLeft from "./components/KeyboardLeft"
import KeyboardTop from "./components/KeyboardTop"
import Menu from "./components/Menu"
import { oracle } from "./utils/oracle"

function App() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [input, setInput] = useState<string[]>([])
  const [limit, setLimit] = useState<number>(4)
  const [currentNumber, setCurrentNumber] = useState<any>("")
  const [currentColor, setCurrentColor] = useState<any>("")
  const [prediction, setPrediction] = useState<any>("")
  const [favOrientation, setFavOrientation] = useState("top")
  const [stack, setStack] = useState(["QS", "10D", "6C", "AH", "9D"])

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
    setCurrentStep(0)
  }

  const predict = () => {
    const result = oracle(input)
    setPrediction(result)
    setCurrentColor("")
    setCurrentNumber("")
    setInput([])
    setLimit(limit - 1)
    setCurrentStep(currentStep + 1)
  }

  {
    /*************************************************************
     * TO DO : Change window with each step                      *
     *
     * When currentStep = 0 --> oracle(input)
     * When currentStep = 2 --> getStack(input) // input should be previous or in the stack
     * When currentStep = 3 --> getFinal(input) // input should not be previous or final
     **************************************************************/
  }

  return (
    <div className="App">
      <Menu setFavOrientation={setFavOrientation} />
      {currentStep % 2 == 0 && (
        <Display input={input} erase={erase} currentStep={currentStep} />
      )}

      {currentStep % 2 == 1 && (
        <DisplayOne
          prediction={prediction}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
      {favOrientation == "top" ? (
        <KeyboardTop
          input={input}
          limit={limit}
          predict={predict}
          currentStep={currentStep}
          handleInputColor={handleInputColor}
          handleInputNumber={handleInputNumber}
          clear={clear}
        />
      ) : (
        <KeyboardLeft
          input={input}
          limit={limit}
          predict={predict}
          currentStep={currentStep}
          handleInputColor={handleInputColor}
          handleInputNumber={handleInputNumber}
          clear={clear}
        />
      )}
    </div>
  )
}

export default App
