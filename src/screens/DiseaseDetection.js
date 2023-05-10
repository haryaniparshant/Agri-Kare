// import React, { useState, useRef, useEffect } from "react";
// import {
//   StyleSheet,
//   Dimensions,
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// import { Camera } from "expo-camera";
// import { Video } from "expo-av";
// const WINDOW_HEIGHT = Dimensions.get("window").height;
// const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
// const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);
// export default function DiseaseDetection() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [isPreview, setIsPreview] = useState(false);
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const [isVideoRecording, setIsVideoRecording] = useState(false);
//   const [videoSource, setVideoSource] = useState(null);
//   const cameraRef = useRef();
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);
//   const onCameraReady = () => {
//     setIsCameraReady(true);
//   };
//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 0.5, base64: true, skipProcessing: true };
//       const data = await cameraRef.current.takePictureAsync(options);
//       const source = data.uri;
//       if (source) {
//         await cameraRef.current.pausePreview();
//         setIsPreview(true);
//         console.log("picture source", source);
//       }
//     }
//   };
//   const recordVideo = async () => {
//     if (cameraRef.current) {
//       try {
//         const videoRecordPromise = cameraRef.current.recordAsync();
//         if (videoRecordPromise) {
//           setIsVideoRecording(true);
//           const data = await videoRecordPromise;
//           const source = data.uri;
//           if (source) {
//             setIsPreview(true);
//             console.log("video source", source);
//             setVideoSource(source);
//           }
//         }
//       } catch (error) {
//         console.warn(error);
//       }
//     }
//   };
//   const stopVideoRecording = () => {
//     if (cameraRef.current) {
//       setIsPreview(false);
//       setIsVideoRecording(false);
//       cameraRef.current.stopRecording();
//     }
//   };
//   const switchCamera = () => {
//     if (isPreview) {
//       return;
//     }
//     setCameraType((prevCameraType) =>
//       prevCameraType === Camera.Constants.Type.back
//         ? Camera.Constants.Type.front
//         : Camera.Constants.Type.back
//     );
//   };
//   const cancelPreview = async () => {
//     await cameraRef.current.resumePreview();
//     setIsPreview(false);
//     setVideoSource(null);
//   };
//   const renderCancelPreviewButton = () => (
//     <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
//       <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
//       <View
//         style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
//       />
//     </TouchableOpacity>
//   );
//   const renderVideoPlayer = () => (
//     <Video
//       source={{ uri: videoSource }}
//       shouldPlay={true}
//       style={styles.media}
//     />
//   );
//   const renderVideoRecordIndicator = () => (
//     <View style={styles.recordIndicatorContainer}>
//       <View style={styles.recordDot} />
//       <Text style={styles.recordTitle}>{"Recording..."}</Text>
//     </View>
//   );
//   const renderCaptureControl = () => (
//     <View style={styles.control}>
//       <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
//         <Text style={styles.text}>{"Flip"}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         activeOpacity={0.7}
//         disabled={!isCameraReady}
//         onLongPress={recordVideo}
//         onPressOut={stopVideoRecording}
//         onPress={takePicture}
//         style={styles.capture}
//       />
//     </View>
//   );
//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text style={styles.text}>No access to camera</Text>;
//   }
//   return (
//     <SafeAreaView style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         style={styles.container}
//         type={cameraType}
//         flashMode={Camera.Constants.FlashMode.on}
//         onCameraReady={onCameraReady}
//         onMountError={(error) => {
//           console.log("cammera error", error);
//         }}
//       />
//       <View style={styles.container}>
//         {isVideoRecording && renderVideoRecordIndicator()}
//         {videoSource && renderVideoPlayer()}
//         {isPreview && renderCancelPreviewButton()}
//         {!videoSource && !isPreview && renderCaptureControl()}
//       </View>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 35,
//     left: 15,
//     height: closeButtonSize,
//     width: closeButtonSize,
//     borderRadius: Math.floor(closeButtonSize / 2),
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#c4c5c4",
//     opacity: 0.7,
//     zIndex: 2,
//   },
//   media: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   closeCross: {
//     width: "68%",
//     height: 1,
//     backgroundColor: "black",
//   },
//   control: {
//     position: "absolute",
//     flexDirection: "row",
//     bottom: 38,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   capture: {
//     backgroundColor: "#f5f6f5",
//     borderRadius: 5,
//     height: captureSize,
//     width: captureSize,
//     borderRadius: Math.floor(captureSize / 2),
//     marginHorizontal: 31,
//   },
//   recordIndicatorContainer: {
//     flexDirection: "row",
//     position: "absolute",
//     top: 25,
//     alignSelf: "center",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//     opacity: 0.7,
//   },
//   recordTitle: {
//     fontSize: 14,
//     color: "#ffffff",
//     textAlign: "center",
//   },
//   recordDot: {
//     borderRadius: 3,
//     height: 6,
//     width: 6,
//     backgroundColor: "#ff0000",
//     marginHorizontal: 5,
//   },
//   text: {
//     color: "#fff",
//   },
// });

import React, { useState, useRef, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image  } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import modelServer from "../api/modelServer";


const DiseaseDetection = () => {

  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  async function askPermissions (){
    await Camera.requestCameraPermissionsAsync(); 
  }

  useEffect(() => {
    askPermissions();
}, []);

 

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

    
      const response = await fetch('https://7dd7-2407-aa80-15-e0a2-50b9-a785-4ccc-7a5d.ngrok-free.app/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      console.log(response);
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

// import React, { useState, useRef, useEffect } from 'react';
// import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
// import { AntDesign, MaterialIcons } from '@expo/vector-icons';

// const WINDOW_HEIGHT = Dimensions.get('window').height;
// const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

// export default function DiseaseDetection() {
//   const cameraRef = useRef();
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [isPreview, setIsPreview] = useState(false);
//   const [isCameraReady, setIsCameraReady] = useState(false);

//   useEffect(() => {
//     onHandlePermission();
//   }, []);

//   const onHandlePermission = async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     setHasPermission(status === 'granted');
//   };

//   const onCameraReady = () => {
//     setIsCameraReady(true);
//   };

//   const switchCamera = () => {
//     if (isPreview) {
//       return;
//     }
//     setCameraType(prevCameraType =>
//       prevCameraType === Camera.Constants.Type.back
//         ? Camera.Constants.Type.front
//         : Camera.Constants.Type.back
//     );
//   };

//   const onSnap = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 1, base64: true };
//       const data = await cameraRef.current.takePictureAsync(options);
//       const source = data.base64;

//       if (source) {
//         await cameraRef.current.pausePreview();
//         setIsPreview(true);

//         let base64Img = `data:image/jpg;base64,${source}`;
//         let apiUrl =
//           'https://api.cloudinary.com/v1_1/dmypddexj/image/upload';
//         let data = {
//           file: base64Img,
//           upload_preset: '<your-upload-preset>'
//         };

//         fetch(apiUrl, {
//           body: JSON.stringify(data),
//           headers: {
//             'content-type': 'application/json'
//           },
//           method: 'POST'
//         })
//           .then(async response => {
//             let data = await response.json();
//             if (data.secure_url) {
//               alert('Upload successful');
//             }
//           })
//           .catch(err => {
//             alert('Cannot upload');
//             console.log(err);
//           });
//       }
//     }
//   };

//   const cancelPreview = async () => {
//     await cameraRef.current.resumePreview();
//     setIsPreview(false);
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text style={styles.text}>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         style={styles.container}
//         type={cameraType}
//         onCameraReady={onCameraReady}
//         useCamera2Api={true}
//       />
//       <View style={styles.container}>
//         {isPreview && (
//           <TouchableOpacity
//             onPress={cancelPreview}
//             style={styles.closeButton}
//             activeOpacity={0.7}
//           >
//             <AntDesign name='close' size={32} color='#fff' />
//           </TouchableOpacity>
//         )}
//         {!isPreview && (
//           <View style={styles.bottomButtonsContainer}>
//             <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
//               <MaterialIcons name='flip-camera-ios' size={28} color='white' />
//             </TouchableOpacity>
//             <TouchableOpacity
//               activeOpacity={0.7}
//               disabled={!isCameraReady}
//               onPress={onSnap}
//               style={styles.capture}
//             />
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject
//   },
//   camera: {
//     height: '60%',
//     width: '80%',
//   },
//   text: {
//     color: '#fff'
//   },
//   bottomButtonsContainer: {
//     position: 'absolute',
//     flexDirection: 'row',
//     bottom: 28,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 35,
//     right: 20,
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#5A45FF',
//     opacity: 0.7
//   },
//   capture: {
//     backgroundColor: '#5A45FF',
//     borderRadius: 5,
//     height: CAPTURE_SIZE,
//     width: CAPTURE_SIZE,
//     borderRadius: Math.floor(CAPTURE_SIZE / 2),
//     marginBottom: 28,
//     marginHorizontal: 30
//   }
// });

