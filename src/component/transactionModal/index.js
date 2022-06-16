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

    const onFinish = (values) => {
        _Data(values)
        localStorage.setItem('formData', JSON.stringify(values))
        onclose()
    };

    useEffect(() => {
        const formvalue = localStorage.getItem('formData')
        const value = JSON.parse(formvalue)
        const arrayUpadat = value?.users?.map((x) => {
          return {
            ...x,
            date: moment(x.date)
          }
        })
        form.setFieldsValue({ users: arrayUpadat })
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
                <Form.List name="users">
                    {(fields, { add, remove }) => (
                        <>
                            <div className="btnForm">

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add
                                    </Button>
                                </Form.Item>
                                <Button
                                    onClick={form.submit}
                                    type="dashed"
                                >
                                    Submit
                                </Button>
                            </div>

                            {fields.map(({ key, name, ...restField }) => (
                                <Card className="formCrad">
                                    <div style={{ width: '100%', textAlign: 'end' }}>
                                        <DeleteFilled size={25} style={{ right: 0 }} onClick={() => remove(name)} />
                                    </div>
                                    <Form.Item
                                        name={[name, 'key']}
                                        initialValue={+new Date}
                                        hidden
                                    />
                                    <Form.Item
                                        label={'Details'}
                                        labelCol={{ span: 5 }}
                                        name={[name, 'details']}
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
                                        name={[name, 'types']}
                                        labelCol={{ span: 5 }}
                                        initialValue ={'income'}
                                    >
                                        <Radio.Group >
                                            <Radio value={"income"}>Income</Radio>
                                            <Radio value={'expense'}>Expense</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        label={'Amount'}
                                        labelCol={{ span: 5 }}
                                        name={[name, 'amount']}
                                        rules={[{ required: true, message: 'Missing amount' }]}
                                    >
                                        <InputNumber prefix="$" style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        label={'Date'}
                                        name={[name, 'date']}
                                        labelCol={{ span: 5 }}
                                        rules={[{ required: true, message: 'Missing Date' }]}
                                    >
                                        <DatePicker format={dateFormat} />
                                    </Form.Item>
                                </Card>
                            ))}

                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    )
}

export default TransactionForm