import './index.css'

import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="footer-card">
      <h1 className="logo-name">COVID19INDIA</h1>
      <p className="footer-para">
        we stand with everyone fighting on the front lines
      </p>
      <div className="social-media-card">
        <VscGithubAlt className="social-icons" />
        <FiInstagram className="social-icons" />
        <FaTwitter className="social-icons" />
      </div>
    </div>
  )
}
// COVID19<span className="india-name">INDIA</span>
