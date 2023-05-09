import { useState } from "react"
import "./App.scss"
import Display from "./components/Display"
import DisplayOne from "./components/DisplayOne"
import KeyboardLeft from "./components/KeyboardLeft"
import KeyboardTop from "./components/KeyboardTop"
import Menu from "./components/Menu"
import { oracle } from "./utils/oracle"

interface IStack {
  stackZero: string[]
  stackOne: string[]
  stackTwo: string[]
  stackFinal: string[]
}

function App() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [limit, setLimit] = useState<number>(4)
  const [input, setInput] = useState<string[]>([])
  const [currentNumber, setCurrentNumber] = useState<any>("")
  const [currentColor, setCurrentColor] = useState<any>("")
  const [prediction, setPrediction] = useState<any>("")
  const [favOrientation, setFavOrientation] = useState<string>("top")
  const [favBackDesign, setFavBackDesign] = useState<string>("red")
  const [stack, setStack] = useState<IStack>({
    stackZero: ["QS", "10D", "6C", "AH", "9D"],
    stackOne: [],
    stackTwo: [],
    stackFinal: [],
  })

  const handleInputNumber = (x: number | string) => {
    if (currentColor) {
      const stackGlobal = [
        ...stack.stackZero,
        ...stack.stackOne,
        ...stack.stackTwo,
      ]
      if (
        input.length < limit &&
        [currentColor + x, x + currentColor].every(
          (i) => !input.includes(i) && !stackGlobal.includes(i)
        )
      ) {
        setInput([...input, currentColor + x])
        setCurrentColor("")
        setCurrentNumber("")
      }
    } else {
      setCurrentNumber(x)
    }
  }

  const handleInputColor = (x: string | number) => {
    if (currentNumber) {
      const stackGlobal = [
        ...stack.stackZero,
        ...stack.stackOne,
        ...stack.stackTwo,
      ]
      if (
        input.length < limit &&
        [currentNumber + x, x + currentNumber].every(
          (i) => !input.includes(i) && !stackGlobal.includes(i)
        )
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
    setStack({
      stackZero: ["QS", "10D", "6C", "AH", "9D"],
      stackOne: [],
      stackTwo: [],
      stackFinal: [],
    })
  }

  const predict = () => {
    let result
    console.log("myinput", input)
    if (currentStep === 0) {
      result = oracle(input)
      setStack({
        ...stack,
        stackOne: [...stack.stackOne, ...input],
      })
    }

    if (currentStep === 2) {
      result = []
      setStack({
        ...stack,
        stackTwo: [...stack.stackTwo, ...input],
      })
    }
    setPrediction(result)

    //Resets & counts
    setCurrentColor("")
    setCurrentNumber("")
    setInput([])
    setLimit((limit) => limit - 1)
    setCurrentStep((currentStep) => currentStep + 1)
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
          stack={stack}
          setStack={setStack}
          favBackDesign={favBackDesign}
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
