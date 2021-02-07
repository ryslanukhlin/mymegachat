import Login from "./Component/Login";
import Register from "./Component/Register";
import React from "react";
import User from "./Component/User";
import Message from "./Component/Message";
import Friends from "./Component/Friends";
import Search from "./Component/Search";
import MessageItem from "./Component/MessageItem";

export const PUBLIC_ROUTER = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
]

export const PRIVATE_ROUTER = [
    {
        path: '/user',
        component: User
    },
    {
        path: '/message',
        component: Message
    },
    {
        path: '/message/:idRoom',
        component: MessageItem
    },
    {
        path: '/friends',
        component: Friends
    },
    {
        path: '/search',
        component: Search
    },
]

export const NOT_PAGE = () => (<h1>404</h1>);