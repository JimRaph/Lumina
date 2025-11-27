import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newsletter from '../components/Newsletter'
import Partners from '../components/Partners'
import GlobalPresence from '../components/GlobalPresence'
import FeaturedCategories from '../components/FeaturedCategories'

const Home = () => {
  return (
    <div className="">
      <Hero />

      <FeaturedCategories />

      <LatestCollection />

      <BestSeller />

      <Partners />

      <GlobalPresence />

      <OurPolicy />

      <Newsletter />
    </div>
  )
}

export default Home
