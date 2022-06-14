import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="page-not-found-container">
    <div className="page-not-found-responsive">
      <img
        src="https://res.cloudinary.com/dnnzqsug1/image/upload/v1655188632/Page-not-found_qoudgg.png"
        alt="page not found"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-content">
        we are sorry, the page you requested could not be found, Please go back
        to the homepage.
      </p>
      <Link to="/" className="not-found-btn-link">
        <button type="button" className="page-retry-btn">
          Go Back to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
