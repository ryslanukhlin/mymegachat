import React from 'react';
import {Button, Input, Layout} from "antd";
import { useParams } from 'react-router-dom';
import socket from "../socket";
import {useSelector} from "react-redux";
import '../css/MessageItem.css';

const MessageItem = () => {
    const { idRoom } = useParams();
    const userId = useSelector(state => state.userReducer.user._id);
    const [message, setMessage] = React.useState('');
    const messages = React.useRef([]);
    const [msgArr, setMsgArr] = React.useState([]);

    React.useEffect(() => {
        socket.emit('CONNECT_ROOM', {idRoom});
        return () => {
            socket.emit('LEAVE_ROOM', {idRoom});
        }
    }, []);

    React.useEffect(() => {
        socket.on('SET_MESSAGE', ({msg, idUserMsg}) => {
            let newArray;
            if (idUserMsg === userId) {
                newArray = [...messages.current, {txt: msg, key: Date.now(), myMsg: true}];
            } else {
                newArray = [...messages.current, {txt: msg, key: Date.now(), myMsg: false}];
            }
            messages.current = newArray;
            setMsgArr(messages.current);
        })
    }, [])

    const sendMessage = () => {
        socket.emit('ADD_MESSAGE', {message, userId});
        setMessage('');
    }


    return (
        <>
            <Layout.Content>
                {msgArr.length === 0 ? (
                    <div>you have not messages</div>
                ) : msgArr.map(item => {
                    if (item.myMsg)
                       return(
                           <div className="myMessage" key={item.key}>{item.txt}</div>
                       )
                    else return(
                        <div className="friendMessage" key={item.key}>{item.txt}</div>
                    )
                })
                }
            </Layout.Content>
            <Layout.Footer style={{ backgroundColor: "white", display: 'flex' }}>
                <Input placeholder="your message" value={message} onChange={e => setMessage(e.target.value)} />
                <Button type="primary" onClick={sendMessage}>to send</Button>
            </Layout.Footer>
        </>
    );
};

export default MessageItem;