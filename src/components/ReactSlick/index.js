import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

/* Add css to your project */
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  renderSlider = companyLogosData => (
    <Slider {...settings}>
      {companyLogosData.map(eachLogo => {
        const {id, authorName, coverPic, title} = eachLogo
        return (
          <Link className="slick-item-link" to={`/books/${id}`} key={id}>
            <div className="slick-item">
              <img className="logo-image" src={coverPic} alt={title} />
              <div className="heading-container">
                <h1 className="book-title">{title}</h1>
                <p className="author">{authorName}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </Slider>
  )

  render() {
    const {companyLogosData} = this.props
    return (
      <div className="main-container">
        <div className="slick-container">
          {this.renderSlider(companyLogosData)}
        </div>
      </div>
    )
  }
}

export default ReactSlick
