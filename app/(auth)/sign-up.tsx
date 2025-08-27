import { View, Text, ScrollView, Image, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import {createUser} from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignUp = () => {
    const {setuser, setisLoggedIn }= useGlobalContext();
    const [form, setform] = useState({
        username:'',
        email:'',
        password:''
    });

    const [isSubmitting, setisSubmitting] = useState(false)

    const handleSubmit = async()=>{
        if(!form.username || !form.email || !form.password){
            Alert.alert('error', 'please fill in all the fields')
        }

        setisSubmitting(true);
        try {
            const result = await createUser(form.email, form.password, form.username)
           
            setuser(result);
            setisLoggedIn(true);            
            
            router.replace('/home')
            
        } catch (error) {
            Alert.alert('error', error.message)
            
        }finally{
            setisSubmitting(false)
        }

    };

  return (

    <SafeAreaView className='bg-primary h-full' >
        <ScrollView>
            <View className='w-full justify-center min-h-[85vh] px-4 my-6'>


                <Image
                source={images.logo1}
                resizeMode='contain'
                className='w-[115px] h-[35px]'/>

                <Text
                className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign Up to Wavify
                </Text>



                <FormField
                title='Username'
                value={form.username}
                handleChangeText={(e)=> setform({...form, username:e})}
                otherStyles='mt-10'
                />
                

                <FormField
                title='Email'
                value={form.email}
                handleChangeText={(e)=> setform({...form, email:e})}
                otherStyles='mt-7'
                keyboardType='email-address'


                
                />
                <FormField
                title='Password'
                value={form.password}
                handleChangeText={(e)=> setform({...form, password:e})}
                otherStyles='mt-7'
                />

                <CustomButton
                title={'Sign Up'}
                handlePress={handleSubmit}
                containerStyles='mt-7'
                isloading={isSubmitting}/>

                <View className='flex-row gap-2 justify-center pt-5'>

                    <Text className='text-lg text-gray-100 font-pregular'>
                        Have an Account Already?
                    </Text>

                    <Link href='/sign-in' className='text-lg text-secondary font-psemibold'>Sign In</Link>

                </View>

            </View>
        </ScrollView>
    </SafeAreaView>
  )
}
export default SignUp