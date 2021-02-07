import React from 'react';
import '../css/Login.css';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { setForm } from "../reducer/loginForm";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../reducer/userReducer";

const Login = () => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.loginForm)
    const [rememberMe, setRememberMe] = React.useState(false);

    const onChangeForm = (event) => {
        const {name, value} = event.target
        dispatch(setForm({
            name,
            value
        }))
    };

    const login = async () => {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ ...form })
        });
        if (response.status !== 200) return  message.error('invalid username or password');
        const result = await response.json();
        if (rememberMe) localStorage.setItem('token', JSON.stringify(result.token));
        dispatch(setUser(result));
    };

    return (
        <div className="login__wraper">
            <div className="img__wraper">
                <img
                    src="https://img2.goodfon.ru/original/1920x1200/d/d3/kosmos-planety-krasota.jpg"
                    alt="login logo"
                    className="img"
                />
            </div>
            <div className="form__wraper">
                <Form className="form">
                    <h1>Login</h1>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined/>}
                            type="text" placeholder="Email"
                            name="email"
                            onChange={onChangeForm}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={onChangeForm}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox onChange={setRememberMe.bind(this, !rememberMe)}>Remember me</Checkbox>
                        </Form.Item>

                        <a className="form__forgePass" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={login} className="form__btn" type="primary">
                            Log in
                        </Button>
                        Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;