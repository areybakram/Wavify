import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, } from 'react-native'
import {StatusBar} from 'expo-status-bar'
import React from 'react'
import "../global.css"
import { Link , router, Redirect } from 'expo-router'
import icons from '@/constants/icons'
import images from '../constants/images'
import CustomButton from '@/components/CustomButton'
import { useGlobalContext } from '@/context/GlobalProvider'
import Home from './(tabs)/home'
import Profile from './(tabs)/profile'
import Create from './(tabs)/create'

const index = () => {

  const {isLoading, isLoggedIn} = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home"/>

  return (

    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className='items-center justify-center  w-full min-h-[85vh]  px-4 '>
          <Image
          source={images.logo1}
          className='w-[130px] h-[84]px'
          resizeMode='contain'/>

          <Image
          source={images.cards}
          className='max-w-[380 px] w-full h-[300px]'
          resizeMode='contain'/>

          <View className=' relative mt-5'>
            <Text className='text-white text-3xl font-bold text-center '>Discover Endless {"\n"} Possibilities with {''}<Text className='text-secondary-200 '>Wavify</Text></Text>
            <Image 
            source={images.path}
            className='w-[100px] h-[14px] absolute -bottom-3 -right-8 '
            resizeMode='contain'/>
          </View>

          <Text className='text-gray-100 text-sm mt-7 text-center font-pregular'>Where creativity meets innovation: embark on a journey of limitless exploration with Wavify</Text>

          <CustomButton
          title={'Continue with Email'}
          handlePress={()=>router.push('/sign-in')}
          containerStyles={'w-full mt-7'}

          />

        </View>
      </ScrollView>

      <StatusBar backgroundColor='161622' style='light'/>
    </SafeAreaView>

  )
}
export default index


