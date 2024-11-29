import Mercedes from './serivices svgs/mercedes.svg'
import loweringDevice from './serivices svgs/loweringDevice.svg';


const Services={
    servicesData: [
        {
          id: "Ambulance and Pall Bearing Service",
          name: "Ambulance and Pall Bearing Service",
          description: "Our Luxury SUV Ambulance for an Honorable Departure.",
          price: 50000,
          thumbnail: [Mercedes],
        },
        {
          id: "Lowering Device",
          name: "Lowering Device",
          description: "Smooth and respectful lowering device rental for graveside services.",
          price: 15000,
          thumbnail: [loweringDevice],
        },
        {
          id: "Graphics Design and Printing Services",
          name: "Graphics Design and Printing Services",
          description: "Customized design and printing for obituaries, funeral programs, and more.",
          price: 10000,
          thumbnail: "/path-to-image/graphics-design.jpg",
        }
    
       ]
  }
  
export default Services;
  



