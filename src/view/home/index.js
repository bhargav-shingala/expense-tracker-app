import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, message, Popconfirm, Table } from "antd";
import { Link } from "react-router-dom";
import { FormContext } from "../../App";
import EditeForm from "../../component/EditeForm";
import moment from "moment";

const EditButton = ({ row, data, _data }) => {
    const [showModal, _showModal] = useState(false)
    const hendalDelete = () => {
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
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button onClick={() => _showModal(true)}>edit</Button>
                <Button onClick={hendalDelete}>delete</Button>
                <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={hendalDelete}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <a href="#">Delete</a>
                </Popconfirm>
            </div>
            {showModal ? (
                <EditeForm
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
        const formvalue = localStorage.getItem('formData')
        const value = JSON.parse(formvalue)
        console.log('value :>> ', value);
        const arrayUpadat = value?.map((x) => {
            return {
                ...x,
                date: moment(x.date)
            }
        })
        console.log('arrayUpadat :>> ', arrayUpadat);
        _Data(arrayUpadat)
    }, [])

    const columns = [
        {
            title: 'Details',
            dataIndex: 'details',
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (_, record) => {
                return new Date(record.date._d).toLocaleDateString('en-US')
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'types',
            dataIndex: 'types',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            align: 'center',
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