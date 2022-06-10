import './index.css'

const Header = () => (
  <nav className="navbar-container">
    <div className="navbar-responsive">
      <div className="company-logo-container">
        <img
          src="https://res.cloudinary.com/dnnzqsug1/image/upload/v1654146640/Bookhub-logo_mgfumk.png"
          className="company-logo"
          alt="website login"
        />
        <p className="company-text">OOK HUB</p>
      </div>
      <ul className="nav-bar-list">
        <li className="list-item">Home</li>
        <li className="list-item">Bookshelves</li>
        <li className="list-item">
          <button type="button">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
)
export default Header
