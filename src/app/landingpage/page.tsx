import Header from '../components/header'
import Hero from './hero'
import About from './abouttext'
import FocusShowcase from './FocusShowcase'
import Calculator from '../components/Calculator'
import Contact from './contact'
import Footer from '../components/footer'

export default function LandingPageRoute() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <FocusShowcase />
      <Calculator />
      <Contact />
      <Footer />
    </div>
  )
}
