import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import { FormContext } from "../../App";
import EditeForm from "../../component/EditeForm";
import moment from "moment";

const EditButton = ({ row, data, _data }) => {
    const [showModal, _showModal] = useState(false)
    const hendalDelete = () => {
        const newData = data.users.filter((item) => item.key !== row.key);
        _data({ users: newData })
        localStorage.setItem('formData', JSON.stringify({ users: newData }))
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button onClick={() => _showModal(true)}>edit</Button>
                <Button onClick={hendalDelete}>delete</Button>
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
        const arrayUpadat = value?.users?.map((x) => {
            return {
                ...x,
                date: moment(x.date)
            }
        })
        _Data({ users: arrayUpadat })
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
            <Table columns={columns} dataSource={Data.users} size="middle" />
        </div>
    )
}

export default Home