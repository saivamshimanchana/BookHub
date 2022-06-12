import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <div className="navbar-responsive">
        <div className="nav-bar-large-container">
          <div className="company-logo-container">
            <Link to="/" className="nav-link">
              <div className="company-header-logo-container">
                <img
                  src="https://res.cloudinary.com/dnnzqsug1/image/upload/v1654146640/Bookhub-logo_mgfumk.png"
                  className="company-logo"
                  alt="website login"
                />
                <p className="company-text">OOK HUB</p>
              </div>
            </Link>
          </div>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/bookshelves" className="nav-link">
                Bookshelves
              </Link>
            </li>
            <li className="nav-menu-item">
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
