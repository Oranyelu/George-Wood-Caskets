import Mercedes from './serivices svgs/mercedes.svg'
import loweringDevice from './serivices svgs/loweringDevice.svg';


const Services={
    servicesData: [
        {
            id: 1,
            type: 'Ambulance',
            thumbnail: './serivices svgs/mercedes.svg', // Add actual path or URL
            images: ['path/to/image1.jpg', 'path/to/image2.jpg'], // Add actual paths or URLs
            label: "Xclusive",
            name: "Toyota Sequoia",
            price: 300000,
            color: "Rosegold",
            description: '',
                },
          { 
            id: 2, 
            type: 'Ambulance',
            thumbnail: 'path/to/thumbnail2.jpg',
            images: ['path/to/image3.jpg', 'path/to/image4.jpg'],
            name: "Toyota Pathfinder", 
            price: 230000, 
            color: "Silver" 
          },
          {
            id: 3,
            type: 'Pall bearing',
            thumbnail: [loweringDevice],
            images: [[Mercedes], [Mercedes]],
            name: "Lowering Device",
            price: 200000,
            color: "Gold",
          },
          {
            id: 4,
            type: 'Ambulance',
            thumbnail: [Mercedes],
            images: [[Mercedes], [Mercedes]],
            name: "Mercedes-Benz V-class",
            price: 360000,
            color: "Black",
          },
          {
            id: 5,
            type: 'Printing',
            thumbnail: 'path/to/thumbnail5.jpg',
            images: ['/svgs/Background.svg', 'path/to/image10.jpg'],
            name: "Brochure",
            price: 430000,
            color: "blue",
          },
          {
            id: 6,
            type: 'Ambulance',
            thumbnail: 'path/to/thumbnail6.jpg',
            images: ['path/to/image11.jpg', 'path/to/image12.jpg'],
            name: "Cadillac",
            price: 600000,
            color: "Gold",
          },
          { 
            id: 7, 
            thumbnail: 'path/to/thumbnail7.jpg',
            images: ['path/to/image13.jpg', 'path/to/image14.jpg'],
            name: "deep pink ring", 
            price: 70000, 
            color: "Pink" 
          },
          {
            id: 8,
            thumbnail: 'path/to/thumbnail8.jpg',
            images: ['path/to/image15.jpg', 'path/to/image16.jpg'],
            name: "2 stack sterling ring",
            price: 300000,
            color: "Silver",
          },
          { 
            id: 9, 
            thumbnail: 'path/to/thumbnail9.jpg',
            images: ['path/to/image17.jpg', 'path/to/image18.jpg'],
            name: "Rose gold ring", 
            price: 250000, 
            color: "Rosegold" 
          },
          {
            id: 10,
            thumbnail: 'path/to/thumbnail10.jpg',
            images: ['path/to/image19.jpg', 'path/to/image20.jpg'],
            name: "Double twist silver ring",
            price: 400000,
            color: "Silver",
          }
    ]
  }
  
export default Services;
  



