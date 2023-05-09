import React, {useEffect, useContext} from "react";
import { Context as AuthContext } from "../context/AuthContext";
import {navigate} from '../navigationRef'

const ResolveAuthScreen = ({}) =>{
    const {tryLocalSignin} = useContext(AuthContext);

    useEffect(()=>{
        tryLocalSignin();
    },[]);

    return null;
}

export default ResolveAuthScreen;