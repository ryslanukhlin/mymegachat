import React from 'react';
import {Layout} from "antd";

const Friends = () => {
    return (
        <>
            <Layout.Header style={{backgroundColor: '#f0f2f5'}}>
                <header>
                    Friends
                </header>
            </Layout.Header>
            <Layout.Content style={{backgroundColor: 'white'}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, at consequatur culpa cum distinctio, doloremque ea eveniet ipsa ipsum nobis nostrum pariatur reiciendis soluta tempora tenetur ullam ut velit voluptatum?
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Layout.Footer>
        </>
    );
};

export default Friends;