import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, message, Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { FormContext } from "../../App";
import EditForm from "../../component/EditForm";
import moment from "moment";

const EditButton = ({ row, data, _data }) => {
    const [showModal, _showModal] = useState(false)
    const handleDelete = () => {
        const newData = data.filter((item) => item.key !== row.key);
        _data(newData)
        localStorage.setItem('formData', JSON.stringify(newData))
    }
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    return (
        <>
            <div style={{ display: 'flex', }}>
                <EditOutlined
                    style={{ fontSize: '25px', color: '#08c' }}
                    onClick={() => _showModal(true)}
                />
                <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={handleDelete}

                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined 
                     style={{ fontSize: '25px', color: 'red', marginLeft:20 }}
                    />
                </Popconfirm>
            </div>
            {showModal ? (
                <EditForm
                    show={showModal}
                    row={row}
                    onClose={() => _showModal(false)}
                    data={data}
                    _data={_data}
                />
            ) : null}
        </>
    )
}

const Home = () => {
    const [Data, _Data] = useContext(FormContext)

    useEffect(() => {
        const formValue = localStorage.getItem('formData')
        const value = JSON.parse(formValue)
        console.log('value :>> ', value);
        const arrayUpdate = value?.map((x) => {
            return {
                ...x,
                date: moment(x.date)
            }
        })
        console.log('arrayUpdate :>> ', arrayUpdate);
        _Data(arrayUpdate)
    }, [])

    const columns = [
        {
            title: 'Details',
            dataIndex: 'details',
            width: '20%',
        },
        {
            title: "Date",
            dataIndex: "date",
            width: '15%',
            render: (_, record) => {
                return new Date(record.date._d).toLocaleDateString('en-US')
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            width: '8%',
        },
        {
            title: 'types',
            dataIndex: 'types',
            width: '10%',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            align: 'center',
            width: '5%',
            render: (col, row) => (
                <EditButton
                    row={row}
                    _data={_Data}
                    data={Data}
                />
            )
        }
    ];

    return (
        <div style={{
            margin: 50
        }}>
            <Table columns={columns} dataSource={Data} size="middle" />
        </div>
    )
}

export default Home