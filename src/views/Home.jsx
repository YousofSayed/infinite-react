import React from 'react'
import { HomeNav } from '../components/Home/HomeNav'
import { HomeHeader } from '../components/Home/HomeHeader'

export const Home = () => {
  return (
    <main className='w-full h-full flex justify-between'>
        <HomeNav/>
        <section className='w-[calc(100%-70px)] h-full'>
          <HomeHeader/>
        </section>
    </main>
  )
}
