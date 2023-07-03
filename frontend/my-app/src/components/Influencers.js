import React, {useEffect, useState} from "react";
import {Button, Card, Modal, Space, Table} from "antd";
import axios from "axios";

const Influencers = () => {

    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectItem, setSelectItem] = useState({})
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const getData = async () => {
        const {data} = await axios.get('http://localhost:3000/influencers')
        setData(data)
    }
    useEffect(() => {
        getData()
    }, [])
    const columns = [{
        title: 'Edad',
        dataIndex: 'edad',
        key: 'edad'
    },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count'
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count'
        },
        {
            title: 'Likes',
            dataIndex: 'likes',
            key: 'likes'
        },
        {
            title: 'Interaccion',
            dataIndex: 'interaccion',
            key: 'interaccion'
        },
        {
            title: 'Comments',
            dataIndex: 'comments',
            key: 'comments'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        setSelectItem(record)
                        showModal()
                    }
                    }>Ver</Button>
                </Space>

            ),
        }
    ]
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Card title="Influencers" bordered={true} style={{width: '100%', height: '100%'}}>
                <Table dataSource={data} columns={columns} size={'small'} pagination={{pageSize: 5}}/>
            </Card>
            <Modal title="Detalle" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <h4> Edad: {selectItem.edad}</h4>
                <h4> Count:{selectItem.count}</h4>
                <h4> Likes: {selectItem.likes}</h4>
                <h4> Shares: {selectItem.shares}</h4>
                <h4> Audiencia:{selectItem.audiencia}</h4>
                <h4> Interaccion: {selectItem.interaccion}</h4>
                <h4> Comments: {selectItem.comments}</h4>
            </Modal>
        </div>
    )
}


export default Influencers