import React,{useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';



import Footer from "../../layout/Footer";
import Header from "./../../layout/Header";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import WOW from 'wowjs';
import {script} from '../../../assets/js/script'
import 'malihu-custom-scrollbar-plugin';
export default function AuthRoute({match}) {

    useEffect(()=>{
        script()
    },[script])
    return (
        
        
     
            <main className="page-wrapper">
                {/* Preloader */}
                <div className="preloader" />       
                <Header/>
                    <Switch>    
                        <Route exact path={`${match.url}/login`} component={LoginScreen}></Route>
                        <Route exact path={`${match.url}/get-start`} component={RegisterScreen}></Route>           
                        {/* <Route exact path={`${match.url}/:accountName/:accountId/confirm/user/:userId`} component={ConfirmInvit}></Route>            */}

                    </Switch>
            </main>
     
    )
}
