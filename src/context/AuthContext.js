import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigationRef';
import { NativeModules } from "react-native";
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';


const authReducer = (state,action) => {
    switch (action.type) {
        case 'add_error':
            return {...state,errorMessage: action.payload};
        case 'sign_in':
            return {errorMessage: '',token:action.payload};
        case 'clear_error_message':
            return {...state, errorMessage:''};
        case 'signout':
            return {token: null, errorMessage: ''};
        case 'set_udata':
            return {...state, name: action.payload.name, dob: action.payload.dob, CNIC: action.payload.CNIC, email: action.payload.email, password: action.payload.password };
        default:
            return state;
    };
};

const clearErrorMessage = dispatch => () =>{
    dispatch({type:'clear_error_message'})
};

const tryLocalSignin = dispatch => async () =>{
    const token = await AsyncStorage.getItem('token');
    if(token){
        const temp = await AsyncStorage.getItem('udata');
        const udata = JSON.parse(temp);
        dispatch({type:'sign_in',payload:token});
        dispatch({type:'set_udata',payload:udata});
        dispatch
        navigate('mainFlow');
    }
    else{
        navigate('loginFlow');
    }
};

const signup = (dispatch) => async ({usercode, actualcode, fdata})=>{
    console.log(usercode);
    if (usercode == 'XXXX' || usercode == '') {
        dispatch({type: 'add_error', payload: 'Please enter the code'});
        return;
    }

    else if (usercode == actualcode) {
        try{
            const response = await jsonServer.post('/signup',{fdata: fdata});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'sign_in', payload: response.data.token});
            if (response['data']['message'] === 'User Registered Successfully') {
                alert(response['data']['message']);
                navigate('mainFlow');
            }else {
                alert("Something went wrong !! Try Signing Up Again");
            }
        }
        catch(err){
            console.log(err);
            dispatch({type: 'add_error', payload: 'Something went wrong with signup'})
        }
    }else if (usercode != actualcode) {
        dispatch({type: 'add_error', payload: 'Incorrect code'});
        return;
    }
};

const signin = (dispatch) => async ({email, password})=>{

    if (email == '' || password == '') {
        dispatch({type: 'add_error', payload: 'All fields are required'})
        return;
    }

    try{
        const response = await jsonServer.post('/signin',{email,password})

        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('udata', JSON.stringify(state.udata));
        dispatch({type: 'sign_in', payload: response.data.token});
        alert("Login Successfully");
        navigate('mainFlow');

    }
    catch(err){
        dispatch({type: 'add_error', payload: 'Something went wrong with signin'})
    }
};

const verification = (dispatch) => async ({fdata})=>{

    
    if (fdata.name == '' ||
    fdata.email == '' ||
    fdata.password == '' ||
    fdata.cpassword == '' ||
    fdata.dob == '' ||
    fdata.CNIC == '') {
        dispatch({type: 'add_error', payload: 'All fields are required'})
    return;
}
else {
    if (fdata.password != fdata.cpassword) {
        dispatch({type: 'add_error', payload: 'Password and Confirm Password must be same'});
        return;
    }}

    try{
        const response = await jsonServer.post('/verify',{fdata})
        dispatch({type: 'set_udata', payload: response.data.udata});
        alert(response.data.message);
        navigate('Verification',{VerificationCode:response.data.udata[0]?.VerificationCode, fdata: response.data.udata});
    }
    catch(err){
        console.log(err)
        dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
    }
};


const signout = dispatch => async () =>{
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('udata');
    dispatch({type: 'signout'});
    navigate('loginFlow');
};

export const {Provider, Context} = createDataContext(
    authReducer,
    {signin,signup,signout,clearErrorMessage,tryLocalSignin,verification},
    {token: null, errorMessage:'', udata: null}
);
