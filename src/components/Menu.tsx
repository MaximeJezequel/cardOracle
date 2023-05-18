import { useState } from "react"
import Settings from "../assets/settings.svg"

const Menu = ({
  preferences,
  setPreferences,
}: {
  preferences: any
  setPreferences: any
}) => {
  const [isMenuClicked, setIsMenuClicked] = useState(false)
  const [burgerClass, setBurgerClass] = useState("burger-menu unclicked")
  const [menuClass, setMenuClass] = useState("menu hidden")

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-menu clicked")
      setMenuClass("menu visible")
    } else {
      setBurgerClass("burger-menu unclicked")
      setMenuClass("menu hidden")
    }
    setIsMenuClicked(!isMenuClicked)
  }

  const chooseOrientation = (e: any) => {
    setPreferences((prevPreferences: any) => ({
      ...prevPreferences,
      orientation: e.target.value,
    }))
    setBurgerClass("burger-menu unclicked")
    setMenuClass("menu hidden")
  }

  const chooseBackDesign = (e: any) => {
    setPreferences((prevPreferences: any) => ({
      ...prevPreferences,
      backDesign: e.target.value,
    }))
    setBurgerClass("burger-menu unclicked")
    setMenuClass("menu hidden")
  }

  const updateStack = (e: any) => {
    console.log("updateStack", e.target.vaue)
  }

  return (
    <div className="menu-container">
      <div className={burgerClass} onClick={() => updateMenu()}>
        <img src={Settings} alt="Settings" />
      </div>

      <div className={menuClass}>
        <div className="settings">
          <h2>Settings</h2>
          <div>Orientation</div>
          <div onChange={(e) => chooseOrientation(e)}>
            <input
              type="radio"
              value="top"
              id="top"
              name="orientation"
              checked={preferences.orientation === "top"}
            />
            <label htmlFor="top">Top</label>
            <input
              type="radio"
              value="left"
              id="left"
              name="orientation"
              checked={preferences.orientation === "left"}
            />
            <label htmlFor="left">Left</label>
          </div>
          <span>---</span>
          <div>Back design</div>
          <div onChange={(e) => chooseBackDesign(e)}>
            <input
              type="radio"
              value="red"
              id="red"
              name="backDesign"
              checked={preferences.backDesign === "red"}
            />
            <label htmlFor="red">Red</label>
            <input
              type="radio"
              value="blue"
              id="blue"
              name="backDesign"
              checked={preferences.backDesign === "blue"}
            />
            <label htmlFor="blue">Blue</label>
          </div>
          <span>---</span>
          <div>Secret stack</div>
          <div className="flex">
            {["QS", "10D", "6C", "AH", "9D"].map((x) => (
              <select id="initialStack" key={x}>
                <option value={x} onChange={updateStack}>
                  {x}
                </option>{" "}
              </select>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
