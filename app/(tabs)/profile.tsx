// the search input generate a url including what query or term we want to search for, now this screen will extract that and filters records for that calling searchposts function from appwrite.js.
import { Image } from 'react-native'
import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import { getUserPosts, signOut } from '@/lib/appwrite'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, SafeAreaView, Text, TouchableHighlight, View } from 'react-native'
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import { icons } from '@/constants'
import InfoBox from '@/components/InfoBox'


const Profile = () => {

  const{user, setuser, setisLoggedIn} = useGlobalContext();

  const{data : posts , refetch} = useAppwrite(
    ()=>getUserPosts(user.$id)
  ) 
  
  const Logout = async() =>{
    await signOut();
    setuser(null);
    setisLoggedIn(false);
    router.replace('/(auth)/sign-in');
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
      data={posts}
      keyExtractor={(item)=>item.$id}
      renderItem={({item})=>(
        <VideoCard video={item}/>
        
      )}
      ListHeaderComponent={()=>(
        <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
          <TouchableHighlight
          className='w-full items-end mb-10 mt-5'
          onPress={Logout}>
            <Image
            source={icons.logout}
            resizeMode='contain'
            className='w-6 h-6'
            />
          </TouchableHighlight>
          <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
            <Image
            source={icons.profile}
            className='w-[90%] h-[90%] rounded-lg'
            resizeMode='cover'/> 
          </View>

          <InfoBox
          title={user?.username}
          containerStyles='mt-5'
          titleStyles='text-lg '
          />

          <View className='mt-5 flex-row'>
            <InfoBox
          title={posts?.length || 0}
          subtitle='Posts'
          containerStyles='mr-10'
          titleStyles='text-xl '
          />
          <InfoBox
          title='1.2k'
          subtitle='Followers'
          
          titleStyles='text-xl '
          />

          </View>
        </View>
      )}

      ListEmptyComponent={()=>(
        <EmptyState
        title='No Videos Found'
        subtitle='No videos found for this search query'/>
        
      )}
      
      />
    </SafeAreaView>
    
  )
}

export default Profile

