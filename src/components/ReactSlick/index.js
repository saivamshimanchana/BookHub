import {Component} from 'react'
import Slider from 'react-slick'

/* Add css to your project */
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
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
          <div className="slick-item" key={id}>
            <img className="logo-image" src={coverPic} alt="company logo" />
          </div>
        )
      })}
    </Slider>
  )

  render() {
    const {companyLogosData} = this.props
    return (
      <div className="main-container">
        <h1>Company Logos</h1>
        <div className="slick-container">
          {this.renderSlider(companyLogosData)}
        </div>
      </div>
    )
  }
}

export default ReactSlick
