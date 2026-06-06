import Mercedes from './serivices svgs/mercedes.svg';
import loweringDevice from './serivices svgs/loweringDevice.svg';
import photographyService from './photography_service.png';
import graphicsDesignService from './graphics_design_service.png';

const Services = {
    servicesData: [
        {
          id: "Ambulance and Pall Bearing Service",
          name: "Ambulance and Pall Bearing Service",
          description: "Our Luxury SUV Ambulance for an Honorable Departure.",
          thumbnail: Mercedes,
        },
        {
          id: "Lowering Device",
          name: "Lowering Device",
          description: "Smooth and respectful lowering device rental for graveside services.",
          thumbnail: loweringDevice,
        },
        {
          id: "Graphics Design and Printing Services",
          name: "Graphics Design and Printing Services",
          description: "Customized design and printing for obituaries, funeral programs, and more.",
          thumbnail: graphicsDesignService,
        },
        {
          id: "Photography and Video Coverage",
          name: "Photography and Video Coverage",
          description: "Professional photography and high-definition video coverage to document and preserve funeral service memories with dignity.",
          thumbnail: photographyService,
        }
    ]
};

export default Services;
