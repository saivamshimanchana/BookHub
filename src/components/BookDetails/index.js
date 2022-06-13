import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class BookDetails extends Component {
  state = {
    bookDetails: '',
  }

  componentDidMount() {
    this.fetchBookDetails()
  }

  onSuccessResponse = updatedData => {
    this.setState({
      bookDetails: updatedData,
    })
  }

  fetchBookDetails = async () => {
    console.log('inside fetchBookDetails')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
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
    if (response.ok === true) {
      this.onSuccessResponse(updatedData)
    }
  }

  render() {
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
      <div className="book-details-container">
        <Header />
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
        </div>
        <div className="book-details-footer-section">
          <Footer />
        </div>
      </div>
    )
  }
}
export default BookDetails
