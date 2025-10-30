import Header from '../components/header'
import Hero from './hero'
import About from './abouttext'
import FocusShowcase from './FocusShowcase'
import Contact from './contact'
import Footer from '../components/footer'

export default function LandingPage() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <FocusShowcase />
      <Contact />
    </div>
  )
}