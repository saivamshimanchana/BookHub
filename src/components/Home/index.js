import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-body-section">
          <div className="home-heading-content-container">
            <h1 className="heading">Find Your Next Favorite Books?</h1>
            <p className="content">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
          </div>
          <div className="top-rated-books-container">
            <div className="top-rated-books-heading-container">
              <h1 className="find-books-heading">Top Rated Books</h1>
              <button type="button" className="findbooks-btn">
                Find Books
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Home
