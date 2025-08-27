import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import icons from '../constants/icons'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {

    const [showpassword, setshowpassword] = useState(false)
    const [IsFocused, setIsFocused] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`} >
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View
      className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row 
        ${IsFocused ? "border-secondary" : "border-black-200"}`}
    >
      <TextInput
        className=" flex-1 text-white font-psemibold text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showpassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {title==='Password' && (
        <TouchableOpacity onPress={()=>setshowpassword(!showpassword)}>
            <Image
            source={!showpassword? icons.eye: icons.eyeHide}
            className='w-6 h-6'
            resizeMode='contain'
            />

        </TouchableOpacity>
      )}

    </View>
    </View>
  )
}

export default FormField