import React, {useEffect, useState} from "react";
import {Card, Table} from "antd";
import axios from "axios";

const Publicaciones = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        const {data} = await axios.get('http://localhost:3000/publicaciones')
        setData(data)
    }
    useEffect(() => {
        getData()
    }, [])
    const columns = [{
        title: 'Text',
        dataIndex: 'text',
        key: 'text'
    },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        }
    ]
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Card title="Publicaciones" bordered={true} style={{width: '100%', height: '100%'}}>
                <Table dataSource={data} columns={columns} size={'small'} pagination={{pageSize:2}}/>
            </Card>
        </div>
    )
}


export default Publicaciones