import './index.css'

import {Link} from 'react-router-dom'
import {IoIosMenu} from 'react-icons/io'
import {IoCloseCircle} from 'react-icons/io5'
import {useState} from 'react'

export default function Header() {
  const [isPopup, setPopupState] = useState(false)
  const onToggleMenuButton = () => {
    setPopupState(prev => !prev)
  }

  return (
    <div className="header-container">
      <nav className="nav-bar">
        <Link to="/" className="link">
          <h1 className="logo-name">
            COVID19<span className="india-name">INDIA</span>
          </h1>
        </Link>
        <ul className="nav-items-sm">
          <li>
            <button
              type="button"
              onClick={onToggleMenuButton}
              className="menu-btn"
              aria-label="toggle-menu"
            >
              <IoIosMenu className="menu-icon" />
            </button>
          </li>
        </ul>
        <ul className="nav-items-lg">
          <Link to="/" className="route-name">
            <li>
              <button type="button" className="btn">
                Home
              </button>
            </li>
          </Link>
          <Link to="/about" className="route-name">
            <li>
              <button type="button" className="btn">
                About
              </button>
            </li>
          </Link>
        </ul>
      </nav>
      {isPopup && (
        <ul className="popup-routes">
          <Link to="/" className="route-name-sm">
            <li>
              <button type="button" className="btn">
                Home
              </button>
            </li>
          </Link>
          <Link to="/about" className="route-name-sm">
            <li>
              <button type="button" className="btn">
                About
              </button>
            </li>
          </Link>

          <button
            type="button"
            onClick={onToggleMenuButton}
            className="menu-btn close-btn"
            aria-label="toggle-menu"
          >
            <IoCloseCircle className="menu-icon" />
          </button>
        </ul>
      )}
    </div>
  )
}
//  COVID19<span className="india-name">INDIA</span>
