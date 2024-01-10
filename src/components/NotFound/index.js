import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-img"
      src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1652011250/Covid19%20Dashboard/PageNotFound_jyng5w.png"
      alt="not-found-pic"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/" className="link">
      <button type="button" className="home-btn">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
