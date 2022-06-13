import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    bookshelfName: 'ALL',
    searchText: '',
    booksDataList: [],
    apiStatus: apiStatusConstants.initial,
    readStatus: 'All',
  }

  componentDidMount() {
    this.fetchBooks()
  }

  onSuccessResponse = updatedData => {
    this.setState({
      apiStatus: apiStatusConstants.success,
      booksDataList: updatedData,
    })
  }

  fetchBooks = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inprogress,
    })
    const {bookshelfName, searchText} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const booksData = data.books
    // console.log(booksData.length)
    const updatedData = booksData.map(eachBookItem => ({
      id: eachBookItem.id,
      authorName: eachBookItem.author_name,
      coverPic: eachBookItem.cover_pic,
      title: eachBookItem.title,
      readStatus: eachBookItem.read_status,
      rating: eachBookItem.rating,
    }))
    // console.log(updatedData)
    if (response.ok === true) {
      this.onSuccessResponse(updatedData)
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={60} width={60} />
    </div>
  )

  onClickUpdateBookshelf = event => {
    const {value, id} = event.target
    this.setState(
      {
        bookshelfName: value,
        searchText: '',
        readStatus: id,
      },
      this.fetchBooks,
    )
  }

  onSearchInputChange = event => {
    const {value} = event.target
    this.setState({
      searchText: value,
    })
  }

  renderBookItem = eachBookItem => {
    const {id, authorName, coverPic, title, readStatus, rating} = eachBookItem
    return (
      <Link className="book-item-link" to={`/books/${id}`}>
        <li key={id} className="book-item-container">
          <img src={coverPic} alt={title} className="book-cover-image" />
          <div className="book-item-details">
            <h1 className="book-title">{title}</h1>
            <p className="book-author">{authorName}</p>
            <p className="book-rating">
              Avg Rating <BsFillStarFill className="star-icon" /> {rating}
            </p>
            <p className="book-status">
              Status: <span className="status">{readStatus}</span>
            </p>
          </div>
        </li>
      </Link>
    )
  }

  renderSuccessView = () => {
    const {booksDataList, readStatus} = this.state

    return (
      <div className="success-view-container">
        <div className="success-view-heading-container">
          <h1 className="success-view-heading">{readStatus} Books</h1>
          <div className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onSearchInputChange}
            />
            <div className="search-btn-container">
              <button
                type="button"
                testid="searchButton"
                className="search-btn"
                onClick={this.fetchBooks}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
        </div>
        <ul className="book-items-list">
          {booksDataList.map(eachBookItem => this.renderBookItem(eachBookItem))}
        </ul>
        <div className="book-shelves-footer-section">
          <Footer />
        </div>
      </div>
    )
  }

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
      <div className="bookshelves-container">
        <Header />
        <div className="bookshelves-body-container">
          <ul className="bookshelves-sidebar-container">
            <h1 className="bookshelves-sidebar-heading">Bookshelves</h1>
            {bookshelvesList.map(eachItem => (
              <li key={eachItem.id} className="sidebar-list-item">
                <button
                  type="button"
                  className="sidebar-item-btn"
                  onClick={this.onClickUpdateBookshelf}
                  value={eachItem.value}
                  id={eachItem.label}
                >
                  {eachItem.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="books-display">{this.renderApiResponse()}</div>
        </div>
      </div>
    )
  }
}
export default Bookshelves
