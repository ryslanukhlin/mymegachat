import React from 'react';
import {Button, Card, Col, Layout, Row} from "antd";
import {useSelector} from "react-redux";
import SearchItem from "./SearchItem";

const Search = () => {
    const user = useSelector(state => state.userReducer.user);
    const [users, setUsers] = React.useState([]);

    React.useEffect(async () => {
        const response = await fetch('http://localhost:8000/api/users',{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id: user._id})
        });
        const result = await response.json();
        setUsers(result);
    }, []);

    return (
        <>
            <Layout.Header style={{backgroundColor: '#f0f2f5'}}>
                <header>
                    Search
                </header>
            </Layout.Header>
            <Layout.Content style={{backgroundColor: 'white'}}>
                <Row gutter={16} style={{maxWidth: '100%', padding: 20}}>
                    {users.map(item => (
                        <SearchItem item={item} key={item._id}/>
                    ))}
                </Row>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Layout.Footer>
        </>
    );
};

export default Search;