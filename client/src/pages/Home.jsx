import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from '../components/Main'
import Features from '../components/Feature'

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start">
      <Navbar />
      <Header />
      <Main />
      <Features />
      <Footer />
    </div>
  )
}

export default Home;