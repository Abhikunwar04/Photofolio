import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import About from './pages/About'
import Contact from './pages/Contact'
import CustomCursor from './components/ui/CustomCursor'
import Preloader from './components/ui/Preloader'
import useSmoothScroll from './hooks/useSmoothScroll'

function AppContent() {
  useSmoothScroll()
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      {loaded && <AppContent />}
    </>
  )
}

export default App