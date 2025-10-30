import Header from './components/header'
import Hero from './landingpage/hero'
import About from './landingpage/abouttext'
import FocusShowcase from './landingpage/FocusShowcase'
import Contact from './landingpage/contact'
import Footer from './components/footer'

export default function LandingPage() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <FocusShowcase />
      <Contact />
      <Footer />
    </div>
  )
}