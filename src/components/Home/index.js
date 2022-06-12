import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Footer from '../Footer'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    companyLogosData: [],
  }

  componentDidMount() {
    this.fetchTopRatedBooks()
  }

  onSuccessResponse = updatedData => {
    this.setState({
      isLoading: false,
      companyLogosData: updatedData,
    })
  }

  fetchTopRatedBooks = async () => {
    console.log('inside fetchTopRatedBooks')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
    const updatedData = booksData.map(eachBookItem => ({
      id: eachBookItem.id,
      authorName: eachBookItem.author_name,
      coverPic: eachBookItem.cover_pic,
      title: eachBookItem.title,
    }))

    if (response.ok === true) {
      this.onSuccessResponse(updatedData)
    }
  }

  renderFailureView = () => (
    <div className="homepage-failure-view">
      <img
        src="https://res.cloudinary.com/dnnzqsug1/image/upload/v1655015009/Homepage-Failure-img_kbkz4c.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">
        Something went wrong, Please try again.
      </h1>
      <button
        type="submit"
        className="retry-btn"
        onClick={this.fetchTopRatedBooks}
      >
        Retry
      </button>
    </div>
  )

  onClickFindBooksBtn = () => {
    const {history} = this.props
    history.push('/bookshelves')
  }

  render() {
    const {isLoading, companyLogosData} = this.state
    return (
      <>
        <Header />
        {isLoading ? (
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#0284C7" height={60} width={60} />
          </div>
        ) : (
          <div className="home-body-section">
            <div className="home-heading-content-container">
              <h1 className="heading">Find Your Next Favorite Books?</h1>
              <p className="content">
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
            </div>
            <div className="top-rated-books-container">
              <div className="top-rated-books-heading-container">
                <h1 className="find-books-heading">Top Rated Books</h1>
                <button
                  type="button"
                  className="find-books-btn"
                  onClick={this.onClickFindBooksBtn}
                >
                  Find Books
                </button>
              </div>
              <div className="top-rated-books-carousel-container">
                {companyLogosData.length === 0 ? (
                  this.renderFailureView()
                ) : (
                  <ReactSlick companyLogosData={companyLogosData} />
                )}
              </div>
            </div>
            <Footer />
          </div>
        )}
      </>
    )
  }
}
export default Home
