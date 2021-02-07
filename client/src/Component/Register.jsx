import React from 'react';
import {Button, Form, Input, message} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import '../css/Register.css';
import { useSelector, useDispatch } from "react-redux";
import { setErrorsForm, setForm } from "../reducer/registerForm";

const Register = () => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.registerForm);
    const errorsForm = useSelector(state => state.registerForm.errorsForm);

    const onChangeForm = (event) => {
        const {name, value} = event.target
        dispatch(setForm({
            name,
            value
        }))
    };

    const register = async () => {
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ ...form })
        });
        const result = await response.json();
        const obj = {};
        for (const item in errorsForm) {
            obj[item] = {status: false, msg: null};
        }
        if (response.status !== 200) {
            const errors = {};
            result.errors.map((err) => {
                errors[err.param] = { status: 'error', msg: err.msg };
            });
            dispatch(setErrorsForm({ ...obj, ...errors}));
        } else {
            dispatch(setErrorsForm({ ...obj }));
            message.success('registration was successful');
        }
    }

    return (
        <div className="register__wraper">
            <Form className="register__form">
                <h1>Register</h1>
                <Form.Item validateStatus={errorsForm.username.status} help={errorsForm.username.msg}>
                    <Input
                        value={form.username}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                        name="username"
                        onChange={onChangeForm}
                    />
                </Form.Item>
                <Form.Item validateStatus={errorsForm.email.status} help={errorsForm.email.msg}>
                    <Input
                        value={form.email}
                        prefix={<MailOutlined />}
                        type="email" placeholder="Email"
                        name="email"
                        onChange={onChangeForm}
                    />
                </Form.Item>
                <Form.Item validateStatus={errorsForm.password.status} help={errorsForm.password.msg}>
                    <Input.Password
                        value={form.password}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={onChangeForm}
                    />
                </Form.Item>
                <Form.Item validateStatus={errorsForm.repeatPassword.status} help={errorsForm.repeatPassword.msg}>
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="RepeatPassword"
                        value={form.repeatPassword}
                        name="repeatPassword"
                        onChange={onChangeForm}
                    />
                </Form.Item>
                <Form.Item>
                    <Button onClick={register} type="primary">Register</Button>
                </Form.Item>
                <Form.Item>
                    you have account? <Link to="/login">Login</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;