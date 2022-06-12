import {FaGoogle, FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-section">
    <div className="footer-responsive">
      <div>
        <button type="button" className="footer-nav-btn">
          <FaGoogle className="icon-styles" />
        </button>
        <button type="button" className="footer-nav-btn">
          <FaTwitter className="icon-styles" />
        </button>
        <button type="button" className="footer-nav-btn">
          <FaYoutube className="icon-styles" />
        </button>
        <button type="button" className="footer-nav-btn">
          <FaInstagram className="icon-styles" />
        </button>
      </div>
      <p className="contact-us">Contact Us</p>
    </div>
  </div>
)
export default Footer
