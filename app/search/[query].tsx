// the search input generate a url including what query or term we want to search for, now this screen will extract that and filters records for that calling searchposts function from appwrite.js.

import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import { getUserPosts } from '@/lib/appwrite'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import useAppwrite from '../../lib/useAppwrite'


const Search = () => {

  const{query} = useLocalSearchParams();

  const{data : posts , refetch} = useAppwrite(
    ()=>getUserPosts(query)
  ) 
  
  useEffect(()=>{
    refetch();
  }, [query])
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
      data={posts}
      keyExtractor={(item)=>item.$id}
      renderItem={({item})=>(
        <VideoCard video={item}/>
        
      )}
      ListHeaderComponent={()=>(
        <View className='my-6 px-4 '>

      
              <Text className='font-pmedium text-sm text-gray-100'>Search results</Text>
              <Text className='text-2xl font-psemibold text-white'>{query}</Text>

              <View className='mt-6 mb-8'>
                <SearchInput initialQuery={query}/>
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

export default Search
