import React from 'react';
import {Button, Card, Col} from "antd";
import {useSelector} from "react-redux";
import socket from "../socket";

const SearchItem = ({item}) => {
    const [statusFrend, setStatusFrend] = React.useState(false);
    const user = useSelector(state => state.userReducer.user);

    React.useEffect(() => {
        user.friends.map(user => {
           if (item._id === user){
               setStatusFrend(true);
           }
        });
    });

    const addFriend = (id, idFriend) => {
        setStatusFrend(true);
        socket.emit('ADD_FRIEND', {id, idFriend});
    }

    socket.on('SET_USER', ({id, idFriend}) => {
        if (item._id === id && user._id === idFriend) {
            setStatusFrend(true);
        }
    })

    return (
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                actions={[
                    statusFrend ? (
                        <Button>remove frend</Button>
                        ) : (
                        <Button onClick={addFriend.bind(this, user._id, item._id)}>add frend</Button>
                        )
                ]}
            >
                <Card.Meta title={item.username} description={item.email} />
            </Card>
        </Col>
    );
};

export default SearchItem;