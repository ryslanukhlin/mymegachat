import React from 'react';
import AppRouter from "./Component/AppRouter";
import { setUser } from "./reducer/userReducer";
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    React.useEffect(async () => {
        if (localStorage.getItem('token')) {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({token: localStorage.getItem('token')})
            });
            if (response.status === 200) {
                const result = await response.json();
                return  dispatch(setUser(result));
            }
        }
    }, []);

    return (
        <div>
            <AppRouter/>
        </div>
    );
};

export default App;