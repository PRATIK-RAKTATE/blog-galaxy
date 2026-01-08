import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start">
      <Navbar />
      <Header />
      <Footer />
    </div>
  )
}

export default Home;