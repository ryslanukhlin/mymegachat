import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { PUBLIC_ROUTER, PRIVATE_ROUTER, NOT_PAGE } from '../route';
import { useSelector } from 'react-redux';
import Home from "./Home";

const AppRouter = () => {
    const isAuth = useSelector(state => state.userReducer.isAuth);

    return isAuth ?
        (
            <Home/>
        )
        :
        (
            <Switch>
                {PUBLIC_ROUTER.map(({path, component}) => (
                    <Route key={path} path={path} exact component={component}/>
                ))}
                <Redirect to='/login' />
            </Switch>
        )
};

export default AppRouter;