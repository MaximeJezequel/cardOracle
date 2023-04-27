import { useState } from "react"
import Settings from "../assets/settings.svg"

const Menu = ({ setFavOrientation }: { setFavOrientation: any }) => {
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

  const chooseLeftOrientation = () => {
    setFavOrientation("left")
    setBurgerClass("burger-menu unclicked")
    setMenuClass("menu hidden")
  }

  const chooseTopOrientation = () => {
    setFavOrientation("top")
    setBurgerClass("burger-menu unclicked")
    setMenuClass("menu hidden")
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
          <ul>
            <li onClick={() => chooseTopOrientation()}>Top</li>
            <li onClick={() => chooseLeftOrientation()}>Left</li>
          </ul>
          <div>Stack</div>
        </div>
      </div>
    </div>
  )
}

export default Menu
