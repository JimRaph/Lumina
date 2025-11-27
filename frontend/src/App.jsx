import { Routes, Route } from 'react-router-dom'
import Placeorder from './pages/Placeorder'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import About from './pages/About'
import Home from './pages/Home'
import Product from './pages/Product'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import VerifyPage from './pages/Verification'


const App = () => {
  
  return (
    <div className='flex flex-col min-h-screen'>

      <ToastContainer />
      <Navbar />
    
      <div className='px-4 flex-1'>

        <SearchBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/place-order' element={<Placeorder />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/verify' element={<VerifyPage />} />
        </Routes>      
      </div>

      <Footer />
    </div>
  )
}

export default App
