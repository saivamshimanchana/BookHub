import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ReactSlick from '../ReactSlick'

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
    // this.setState({isLoading: false})
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
                <button type="button" className="find-books-btn">
                  Find Books
                </button>
              </div>
              <div className="top-rated-books-carousel-container">
                <ReactSlick companyLogosData={companyLogosData} />
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}
export default Home
