import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigationRef'
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
        dispatch({type:'sign_in',payload:token});
        navigate('mainFlow');
    }
    else{
        navigate('loginFlow');
    }
};

const signup = (dispatch) => async ({email, password})=>{
        try{
            const response = await jsonServer.post('/signup',{email,password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'sign_in', payload: response.data.token});

            navigate('mainFlow');
        }
        catch(err){
            dispatch({type: 'add_error', payload: 'Something went wrong with signup'})
        }
};

const signin = (dispatch) => async ({email, password})=>{
    try{
        const response = await jsonServer.post('/signin',{email,password})

        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'sign_in', payload: response.data.token});

        navigate('mainFlow');

    }
    catch(err){
        dispatch({type: 'add_error', payload: 'Something went wrong with signin'})
    }
};


const signout = dispatch => async () =>{
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    NativeModules.DevSettings.reload();
};

export const {Provider, Context} = createDataContext(
    authReducer,
    {signin,signup,signout,clearErrorMessage,tryLocalSignin},
    {token: null, errorMessage:''}
);
