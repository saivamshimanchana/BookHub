import {Component} from 'react'
import {Link, withRouter, NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdCancel} from 'react-icons/md'
import './index.css'

class Header extends Component {
  state = {
    displayNavbar: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  updateNavBarStatus = () => {
    this.setState(prevState => ({
      displayNavbar: !prevState.displayNavbar,
    }))
  }

  render() {
    const {displayNavbar} = this.state
    return (
      <div className="header-container">
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
              <img
                className="hamburger-icon"
                src="https://res.cloudinary.com/dnnzqsug1/image/upload/v1655348471/hamburger-icon_dcfjlo.png"
                alt="nav menu"
                onClick={this.updateNavBarStatus}
              />
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
        {displayNavbar && (
          <ul className="nav-menu-mobile">
            <li
              className="nav-menu-item-mobile"
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
            <li className="nav-menu-item-mobile" value="bookshelf">
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
            <li className="nav-menu-item-mobile" key="logout-btn">
              <button
                type="button"
                className="logout-mobile-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
            <li className="nav-menu-item-mobile" key="cancel-btn">
              <button
                type="button"
                className="cancel-btn"
                onClick={this.updateNavBarStatus}
              >
                <MdCancel className="cancel-icon" />
              </button>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
