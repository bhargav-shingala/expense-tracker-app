import { Button, DatePicker, Form, Input, InputNumber, Modal, Radio } from "antd";
import React from "react";

const EditeForm = ({ onClose, row, data, _data }) => {
  const onFinish = (values) => {
    const newValue = data.users.map((x) => {
      if (x.key == row.key) {
        return values
      } else {
        return x
      }
    })
    _data({ users: newValue })
    localStorage.setItem('formData', JSON.stringify({ users: newValue }))
    onClose()
  };
  return (
    <Modal title="Basic Modal" visible={true} onCancel={onClose} footer={null}>
      <Form
        name="update_module"
        style={{ margin: 40 }}
        onFinish={onFinish}
      >
        <Form.Item
          name='key'
          initialValue={row.key}
          hidden
        ></Form.Item>
        <Form.Item
          name='date'
          initialValue={row.date}
          rules={[
            {
              required: true,
              message: 'Please input your date!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name='details'
          initialValue={row.details}
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='types'
          initialValue={row.types}
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={'income'}>income</Radio>
            <Radio value={'expense'}>expense</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='amount'
          initialValue={row.amount}
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  )
}
export default EditeForm