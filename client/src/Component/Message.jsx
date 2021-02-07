import React from 'react';
import {Layout} from "antd";
import {useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import '../css/Message.css';

const Message = () => {
    const history = useHistory();
    const user = useSelector(state => state.userReducer.user);

    return (
        <>
            <Layout.Header style={{backgroundColor: '#f0f2f5'}}>
                <header>
                    Message
                </header>
            </Layout.Header>
            <Layout.Content style={{backgroundColor: 'white'}}>
                {user.rooms.length === 0 ? (
                    <div>you not have friend</div>
                ) : user.rooms.map(item => (
                        <div
                            onClick={() => history.push('/message/' + item)}
                            key={item}
                            className="chatBlog">
                            {item}
                        </div>
                ))}
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Layout.Footer>
        </>
    );
};

export default Message;