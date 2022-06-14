import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    bookDetails: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchBookDetails()
  }

  onSuccessResponse = updatedData => {
    this.setState({
      bookDetails: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  onFailureResponse = () => {
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  fetchBookDetails = async () => {
    // console.log('inside fetchBookDetails')
    this.setState({
      apiStatus: apiStatusConstants.inprogress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const booksData = data.book_details
      const updatedData = {
        id: booksData.id,
        authorName: booksData.author_name,
        coverPic: booksData.cover_pic,
        aboutBook: booksData.about_book,
        rating: booksData.rating,
        readStatus: booksData.read_status,
        title: booksData.title,
        aboutAuthor: booksData.about_author,
      }
      this.setState({
        bookDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 400) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFooter = () => (
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

  renderLoadingView = () => (
    <div className="book-details-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={60} width={60} />
    </div>
  )

  renderSuccessView = () => {
    const {bookDetails} = this.state
    const {
      authorName,
      coverPic,
      title,
      readStatus,
      rating,
      aboutAuthor,
      aboutBook,
    } = bookDetails

    return (
      <div className="book-details-body-container">
        <div className="book-details-item-container">
          <div className="book-details-item-image-container">
            <img
              src={coverPic}
              alt={title}
              className="book-details-cover-image"
            />
            <div className="book-details-item-details">
              <h1 className="book-details-title">{title}</h1>
              <p className="book-details-author">{authorName}</p>
              <p className="book-details-rating">
                Avg Rating <BsFillStarFill className="star-icon-details" />{' '}
                {rating}
              </p>
              <p className="book-status-details">
                Status: <span className="status-details">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="about-author-container">
            <h1 className="about-author-heading">About Author</h1>
            <p className="about-author-content">{aboutAuthor}</p>
          </div>
          <div className="about-book-container">
            <h1 className="about-book-heading">About Book</h1>
            <p className="about-book-content">{aboutBook}</p>
          </div>
        </div>
        <div className="book-details-footer-section">{this.renderFooter()}</div>
      </div>
    )
  }

  retryBookDetails = () => {
    this.fetchBookDetails()
  }

  renderFailureView = () => (
    <div className="book-details-failure-view">
      <img
        src="https://res.cloudinary.com/dnnzqsug1/image/upload/v1655015009/Homepage-Failure-img_kbkz4c.png"
        alt="failure view"
      />
      <p className="book-details-failure-view-heading">
        Something went wrong. Please try again
      </p>
      <button
        type="submit"
        className="book-details-retry-btn"
        onClick={this.retryBookDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderApiResponse = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'PROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-details-container">
        <Header />
        {this.renderApiResponse()}
      </div>
    )
  }
}
export default BookDetails
