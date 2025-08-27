import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "@/components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",

  });

  const openFilePicker = async (selectType: "image" | "video") => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      const picked = result.assets[0];
      const normalized = {
        uri: picked.uri,
        mimeType: picked.type === "video" ? "video/mp4" : "image/jpeg",
        fileName:
          picked.fileName ||
          `file_${Date.now()}.${picked.type === "video" ? "mp4" : "jpg"}`,
        fileSize: picked.fileSize || 0,
      };

      if (selectType === "image") {
        setForm({ ...form, thumbnail: normalized });
      }
      if (selectType === "video") {
        setForm({ ...form, video: normalized });
      }
    }
  };

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {

      return Alert.alert("Error", "Please fill in all fields and select files");
    }
    setUploading(true);
    try {
      const newPost = await createVideo({ ...form, userId: user.$id });

      // console.log("Created video document:", newPost);
      Alert.alert("Success", "Video uploaded successfully!");

      router.push("/home");
    } catch (error) {
      Alert.alert(
        "Upload Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-12">
        <Text className="text-2l text-white font-psemibold">Upload a video</Text>

        <FormField
          title="Video title"
          value={form.title}
          placeholder={"Add a title to your video"}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          <TouchableOpacity onPress={() => openFilePicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openFilePicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium ">
                  choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder={"The prompt you used to create this video"}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit and publish"
          handlePress={submit}
          containerStyles={"mt-7"}
          isloading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
