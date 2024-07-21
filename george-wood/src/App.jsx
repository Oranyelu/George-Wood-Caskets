import Footer from "./Components/Footer"
import Header from "./Components/Header"
import HeroPage from "./Components/HeroPage"



function App() {
 

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat">
  <Header />
  <main className="flex-grow">
    <HeroPage />
  </main>
  <Footer />
</div>
  )
}

export default App
