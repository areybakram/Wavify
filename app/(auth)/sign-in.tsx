import { View, Text, ScrollView, Image, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router, useRouter } from 'expo-router'
import { account, getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {

    const {setuser, setisLoggedIn }= useGlobalContext();
    const [form, setform] = useState({
        email:'',
        password:''
    });

    const [isSubmitting, setisSubmitting] = useState(false)


    const handleSubmit = async()=>{
            if(!form.email || !form.password){
                Alert.alert('error', 'please fill in all the fields')
            }
    
            setisSubmitting(true);
            try {
                await signIn(form.email, form.password)
                const result = await getCurrentUser();
                setuser(result);
                setisLoggedIn(true);
                router.replace('/home')
                
            } catch (error) {
                Alert.alert('error', error instanceof Error ? error.message : 'An unknown error occurred')
                
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
                className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Wavify
                </Text>

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
                title={'Sign In'}
                handlePress={handleSubmit}
                containerStyles='mt-7'
                isloading={isSubmitting}/>

                <View className='flex-row gap-2 justify-center pt-5'>

                    <Text className='text-lg text-gray-100 font-pregular'>
                        Dont Have an Account?
                    </Text>

                    <Link href='/sign-up' className='text-lg text-secondary font-psemibold'>Sign Up</Link>

                </View>

            </View>
        </ScrollView>

    </SafeAreaView>
  )
}
export default SignIn