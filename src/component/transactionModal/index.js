import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Card, InputNumber, Radio, DatePicker } from 'antd';
import { PlusOutlined, DeleteFilled } from "@ant-design/icons";
import moment from "moment";
import './style.css'
import { FormContext } from "../../App";
const TransactionForm = ({ onclose }) => {
    const [form] = Form.useForm();
    const [Data, _Data] = useContext(FormContext)
    const dateFormat = "DD/MM/YYYY";
console.log('Data :>> ', Data);
    const onFinish = (values) => {
        console.log('values :>> ', values);
        const array = [...Data , values]
        // console.log('array :>> ', array);
        _Data(array)
        localStorage.setItem('formData', JSON.stringify(array))
        onclose()
    };
    console.log('Data :>> ', Data);
    useEffect(() => {
        const formvalue = localStorage.getItem('formData')
        const value = JSON.parse(formvalue)
        const arrayUpadat = value?.map((x) => {
            return {
                ...x,
                date: moment(x.date)
            }
        })
        // console.log('arrayUpadat :>> ', arrayUpadat);
        _Data(arrayUpadat || [])
        // form.setFieldsValue({ users: arrayUpadat })
    }, [])

    return (
        <Modal
            title="Expense Tracke"
            visible={true}
            onOk={onclose}
            onCancel={onclose}
            footer={null}
        >
            <Form form={form} name="Expense Tracker" onFinish={onFinish} autoComplete="off" className="IncomeFrom">

                <div className="btnForm">
                    <Button
                        onClick={form.submit}
                        type="dashed"
                    >
                        Submit
                    </Button>
                </div>
                <Card className="formCrad">

                    <Form.Item
                        name='key'
                        initialValue={+new Date}
                        hidden
                    />
                    <Form.Item
                        label={'Details'}
                        labelCol={{ span: 5 }}
                        name='details'
                        rules={[{ required: true, message: 'Missing destails' }]}
                    >
                        <Input.TextArea
                            placeholder="please add here details"
                            autoSize
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'types'}
                        name='types'
                        labelCol={{ span: 5 }}
                        initialValue={'income'}
                    >
                        <Radio.Group >
                            <Radio value={"income"}>Income</Radio>
                            <Radio value={'expense'}>Expense</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label={'Amount'}
                        labelCol={{ span: 5 }}
                        name='amount'
                        rules={[{ required: true, message: 'Missing amount' }]}
                    >
                        <InputNumber prefix="$" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label={'Date'}
                        name='date'
                        labelCol={{ span: 5 }}
                        rules={[{ required: true, message: 'Missing Date' }]}
                    >
                        <DatePicker format={dateFormat} />
                    </Form.Item>
                </Card>
            </Form>
        </Modal>
    )
}

export default TransactionForm