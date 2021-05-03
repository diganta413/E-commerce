import React from 'react'
import Carousel from 'react-bootstrap/Carousel'


function Carousal() {
    return (
        <div className="carousal" style={{width: "90%",margin: "3% auto"}}>
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i.ytimg.com/vi/dhXCBR2Brkk/sddefault.jpg"
      alt="First slide"
      style={{height: "350px"}}
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrYKe2h4AqzdKayWAnKs9S90Lr8219uMOEeg&usqp=CAU"
      alt="Second slide"
      style={{height: "350px"}}
    />

    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://acowebs.com/wp-content/uploads/2019/02/SOCIAL-IMPACT-AND-GROWTH-IN-ELECTRONIC-COMMERCE.png"
      alt="Third slide"
      style={{height: "350px"}}
    />

    
  </Carousel.Item>
</Carousel>
        </div>
    )
}

export default Carousal
