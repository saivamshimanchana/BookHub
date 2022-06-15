import {Component} from 'react'
import {Link, withRouter, NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
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
                    alt="website logo"
                  />
                  <p className="company-text">OOK HUB</p>
                </div>
              </Link>
            </div>
            <ul className="nav-menu">
              <li
                className="nav-menu-item"
                key="home"
                onClick={this.onClickUpdateHomeStyle}
              >
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  key="home"
                  activeClassName="active-tab"
                >
                  Home
                </NavLink>
              </li>
              <li
                className="nav-menu-item"
                value="bookshelf"
                onClick={this.onClickUpdateBookshelvesStyle}
              >
                <NavLink
                  exact
                  to="/shelf"
                  className="nav-link"
                  key="bookshelf"
                  activeClassName="active-tab"
                >
                  Bookshelves
                </NavLink>
              </li>
              <li className="nav-menu-item" key="logout-btn">
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={this.onClickLogout}
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
}

export default withRouter(Header)
