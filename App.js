import { StyleSheet, Text, View } from 'react-native';
import Welcome from './src/screens/Welcome';
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import Admin from './src/screens/Admin';
import { NavigationContainer } from '@react-navigation/native';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Community from './src/screens/Community';
import Verification from './src/screens/Verification';
import DiseaseDetection from './src/screens/DiseaseDetection';
import Homepage from './src/screens/Homepage';
import Pending from './src/screens/Pending'; 
import { createAppContainer, createSwitchNavigator } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack';
import { setNavigator } from './src/navigationRef';
import { Provider as AuthProvider } from './src/context/AuthContext';
import RecommendationPage from './src/screens/RecommendationPage';
import PesticideDetail from './src/screens/PesticideDetail';
import SearchCrop from './src/screens/SearchCrop';
import CreateQuestion from './src/screens/CreateQuestion';
import CreateAnswer from './src/screens/CreateAnswer';
import ShowAnswers from './src/screens/ShowAnswers';

const switchNavigator = createSwitchNavigator({
  Resolve: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Welcome: Welcome,
    Signup: Signup,
    Signin: Signin,
    Admin: Admin,
    Verification: Verification,
  },{
    initialRouteName: 'Welcome',
  }),
  mainFlow: createStackNavigator({
    DiseaseDetection: DiseaseDetection,
    Community: Community,
    Homepage: Homepage,
    Pending: Pending,
    RecommendationPage: RecommendationPage,
    PesticideDetail: PesticideDetail,
    SearchCrop : SearchCrop,
    CreateQuestion: CreateQuestion,
    CreateAnswer : CreateAnswer,
    ShowAnswers : ShowAnswers,
    },{
      initialRouteName: 'Homepage',
    }),
    
},{
  initialRouteName: 'Resolve'
})


const App = createAppContainer(switchNavigator);


export default () => {
  return <AuthProvider>
  <App
  ref={(navigator) =>{
    setNavigator(navigator);
  }}
  />
  </AuthProvider>
}

// export default function App () {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Welcome To Agri-Kare" component={Welcome} />
//         <Stack.Screen name="Signin" component={Signin} />
//         <Stack.Screen name="Signup" component={Signup} />
//         <Stack.Screen name="Admin" component={Admin} />
//         <Stack.Screen name="Community" component={Community} />
//         <Stack.Screen name="Verification" component={Verification} />
//         <Stack.Screen name="DiseaseDetection" component={DiseaseDetection} />
//         <Stack.Screen name="Homepage" component={Homepage} />
//         <Stack.Screen name="Pending" component={Pending} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
   
  },
});
