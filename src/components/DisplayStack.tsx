import { memo } from "react"

const DisplayStack = memo(
  ({ stack, setStack }: { stack: any; setStack: any }) => {
    const deleteItem = () => {
      setStack((prevStack: { stackFinal: any }) => ({
        ...prevStack,
        stackFinal: [...prevStack.stackFinal.slice(0, -1)],
      }))
    }
    return (
      <div className="displayfinal">
        <div className="display-final">
          <div className="flip-card">
            <div className="card">
              {stack.stackFinal.reverse().map((x: any, i: number) => (
                <div
                  className="card-stack"
                  onClick={() => deleteItem()}
                  key={i}
                  style={{
                    top: "0px",
                    transform: `translate(${i * 0.25}vw, ${i * 0.5}vh)`,
                  }}
                >
                  <img src={`/cards/${x}.png`} alt={x} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default DisplayStack
