import { router } from "expo-router";
import { Account, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  Platform: "com.jsm.Wavify",
  projectId: "68a440e20036dfff8410",
  databaseId: "68a443c10010d9fb4f2d",
  userCollectionId: "68a44404002019dd7e7d",
  videoCollectionId: "68a444420008f4acaebc",
  storageId: "68a4471a0006ec77b374",
};

const client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.Platform);

export const account = new Account(client);
export const databases = new Databases(client);
const storage = new Storage(client);


export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw Error("Account creation failed");

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Error creating user");
  }
};


export const signIn = async (email, password) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error.message || "Sign-in failed");
  }
};




export const handleLogout = async () => {
  try {
    await account.get();
    await account.deleteSession("current");
    console.log("Logged out successfully");
  } catch (error) {
    console.warn("No active session or already logged out:", error.message);
  } finally {
    router.replace("/(auth)/sign-in");
  }
};



export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) return null;

    const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    if (!currentUser || currentUser.documents.length === 0) return null;

    return currentUser.documents[0];
  } catch (error) {
    console.log("getCurrentUser error:", error.message);
    return null;
  }
};



export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error.message || "Error fetching posts");
  }
};



export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents.slice(0, 7);
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    throw error;
  }
};



export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.search("title", query),
    ]);
    return posts.documents;
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};



export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.equal("creator", userId),
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};



export const signOut = async () => {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    throw new Error(error.message || "Sign-out failed");
  }
};



const getVideoUrl = (fileId) => {
  const endpoint = client.config.endpoint;
  const projectId = client.config.project;

  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};




export async function getFileUrl(fileId, type) {
  let fileUrl;
  try {
    let url = `https://fra.cloud.appwrite.io/v1/storage/buckets/${config.storageId}/files/${fileId}/view?project=${config.projectId}`;
    return url;
  } catch (error) {
    throw new Error(error);
  }
}




export const uploadFile = async (file, type) => {
  if (!file) return null;

  const asset = {
    name: file.fileName || `file-${Date.now()}`,
    size: file.fileSize || 0,
    type: file.mimeType || "application/octet-stream",
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
    console.log("uploadedFile", uploadedFile);

    if (uploadedFile) {
      let fileUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${config.storageId}/files/${uploadedFile?.$id}/view?project=${config.projectId}`;

      console.log("Generated URL:", fileUrl);
      return fileUrl;
    }
  } catch (error) {
    console.error("uploadFile error:", error.message);
    return null;
  }
};




export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    // console.log("Thumbnail URL:", thumbnailUrl);
    // console.log("Video URL:", videoUrl);

    if (!thumbnailUrl || !videoUrl) {
      throw new Error("Thumbnail or video upload failed");
    }
    // console.log("testing", {
    //   title: form.title,
    //   thumbnail: thumbnailUrl,
    //   video: videoUrl,
    //   prompt: form.prompt,
    //   creator: form.userId,
    // })
    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    console.error("createVideo error:", error.message);
    throw new Error(error.message || "Error creating video");
  }
};
