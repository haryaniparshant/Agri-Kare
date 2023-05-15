import React, { useState, useRef, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image  } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import RecommendationPage from "./RecommendationPage";
import { navigate } from "../navigationRef";



const DiseaseDetection = () => {

  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  async function askPermissions (){
    await Camera.requestCameraPermissionsAsync(); 
  }

  useEffect(() => {
    askPermissions();
}, []);

 
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1.0,
  });

  console.log(result);

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
    }
  };

  const removeImage = async () => {
      setImage(null);
    }

  const sendImage = async () => {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      await fetch('https://9572-125-209-114-66.ngrok-free.app/upload',{
          method: 'POST',
          body: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          navigate('RecommendationPage',{Crop: data.Crop, Disease: data.Disease});
        })
        .catch(error => console.error(error));
    };

  return (
  <View style={{ flex: 1, marginTop: 50, marginBottom: 50}}>
        { image?
          <Image source={{ uri: image }} style={styles.showImage}/>:
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={cameraRef} />
        }
        {image?
        <Button title="Capture New Image" onPress={removeImage} />:
        <Button title="Capture" onPress={captureImage} />
        }
        {image?
        <Button title="Send Image" onPress={sendImage} />:
        null
        }
        {!image?
        <Button title="Upload Image" onPress={pickImage} />:
        null
        }
      </View>
    );
};


export default DiseaseDetection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  showImage: {
    height: '90%',
    width: '90%',
    margin: 15,
  }
});

