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
  stackThree: string[]
  stackFinal: string[]
}

interface IPreferences {
  orientation: string
  backDesign: string
}

function App() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [limit, setLimit] = useState<number>(4)
  const [input, setInput] = useState<string[]>([])
  const [currentNumber, setCurrentNumber] = useState<any>("")
  const [currentColor, setCurrentColor] = useState<any>("")
  const [prediction, setPrediction] = useState<any>("")
  const [preferences, setPreferences] = useState<IPreferences>({
    orientation: "top",
    backDesign: "red",
  })
  const [favOrientation, setFavOrientation] = useState<string>("top")
  const [favBackDesign, setFavBackDesign] = useState<string>("red")
  const [stack, setStack] = useState<IStack>({
    stackZero: ["QS", "10D", "6C", "AH", "9D"],
    stackOne: [],
    stackTwo: [],
    stackThree: [],
    stackFinal: [],
  })

  const handleInputNumber = (x: number | string) => {
    if (!currentColor) {
      setCurrentNumber(x)
      return
    }

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
  }

  const handleInputNumberTwo = (x: number | string) => {
    if (!currentColor) {
      setCurrentNumber(x)
      return
    }
    if (
      input.length < limit &&
      [currentColor + x, x + currentColor].some(
        (i) =>
          !input.includes(i) &&
          !stack.stackOne.includes(i) &&
          stack.stackZero.slice(0, -1).includes(i)
      )
    ) {
      setInput([...input, currentColor + x])
      setCurrentColor("")
      setCurrentNumber("")
    }
  }

  const handleInputNumberThree = (x: number | string) => {
    if (!currentColor) {
      setCurrentNumber(x)
      return
    }
    if (
      input.length < limit &&
      [currentColor + x, x + currentColor].every(
        (i) =>
          !input.includes(i) &&
          !stack.stackOne.includes(i) &&
          !stack.stackTwo.includes(i)
      )
    ) {
      setInput([...input, currentColor + x])
      setCurrentColor("")
      setCurrentNumber("")
    }
  }

  const handleInputColor = (x: string | number) => {
    if (!currentNumber) {
      setCurrentColor(x)
      return
    }

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
  }

  const handleInputColorTwo = (x: string | number) => {
    if (!currentNumber) {
      setCurrentColor(x)
      return
    }
    if (
      input.length < limit &&
      [currentNumber + x, x + currentNumber].some(
        (i) =>
          !input.includes(i) &&
          !stack.stackOne.includes(i) &&
          stack.stackZero.slice(0, -1).includes(i)
      )
    ) {
      setInput([...input, currentNumber + x])
      setCurrentColor("")
      setCurrentNumber("")
    }
  }

  const handleInputColorThree = (x: string | number) => {
    if (!currentNumber) {
      setCurrentColor(x)
      return
    }

    if (
      input.length < limit &&
      [currentNumber + x, x + currentNumber].every(
        (i) =>
          !input.includes(i) &&
          !stack.stackOne.includes(i) &&
          !stack.stackTwo.includes(i)
      )
    ) {
      setInput([...input, currentNumber + x])
      setCurrentColor("")
      setCurrentNumber("")
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
      stackThree: [],
      stackFinal: [],
    })
  }

  const predict = () => {
    let result
    console.log("myinput", input)

    //Phase1
    if (currentStep === 0) {
      result = oracle(input)
      setStack({
        ...stack,
        stackOne: [...stack.stackOne, ...input],
      })
    }

    //Phase2
    if (currentStep === 2) {
      result = stack.stackZero
        .filter((element) => !input.includes(element))
        .slice(0, -1)
      setStack({
        ...stack,
        stackTwo: [...stack.stackTwo, ...input],
      })
    }

    //Phase3
    if (currentStep === 4) {
      result = stack.stackZero.slice(-1)
      setStack({
        ...stack,
        stackThree: [...stack.stackThree, ...input],
      })
    }

    console.log("result: " + result)
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
          handleInputColor={
            currentStep === 0
              ? handleInputColor
              : currentStep === 2
              ? handleInputColorTwo
              : currentStep === 4
              ? handleInputColorThree
              : undefined
          }
          handleInputNumber={
            currentStep === 0
              ? handleInputNumber
              : currentStep === 2
              ? handleInputNumberTwo
              : currentStep === 4
              ? handleInputNumberThree
              : undefined
          }
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
