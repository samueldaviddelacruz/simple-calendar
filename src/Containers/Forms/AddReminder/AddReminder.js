import React from "react";

import { Form, Select, Input, DatePicker, Modal } from "antd";
const { Option } = Select;

const AddReminder = props => {
  
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        
        const reminder = {...values,date:values.date.toDate()}
        
        props.onFormSubmit(reminder)
        props.hideForm()
        props.form.resetFields()
      }
    });
  };
  const onAddReminderCancel = (e) => {
    //props.form.resetFields()
    props.hideForm()
  }

 
  const { getFieldDecorator } = props.form;
  return (
    <Modal
      title="Add a Reminder"
      visible={props.showForm}
      onOk={handleSubmit}
      onCancel={onAddReminderCancel}
    >
      <Form className="login-form">
        <Form.Item label="Text">
          {getFieldDecorator("text", {
            rules: [
              { required: true, message: "Please input a reminder text" },
              {
                max: 30,
                message: "text should not be longer than 30 characters"
              }
            ]
          })(<Input.TextArea placeholder="Buy groceries..." />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator("city", {
            rules: [{ required: true, message: "Please select a city!" }],
            initialValue: "NY"
          })(
            <Select style={{ width: 120 }}>
              <Option value="NY">New York</Option>
              <Option value="TX">Texas</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Date and Time">
          {getFieldDecorator("date", {
            rules: [
              { required: true, message: "Please select a date and time" }
            ]
          })(<DatePicker showTime placeholder="Select A Day and time" />)}
        </Form.Item>
        <Form.Item label="Color">
          {getFieldDecorator("color", {
            rules: [
              { required: true, message: "Please select a color!" }
            ]
          })(<Input type="color" placeholder="Buy groceries..."  style={{ width: 120 }}/>)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const WrappedAddReminderForm = Form.create({ name: "add_reminder_form" })(
  AddReminder
);

export default WrappedAddReminderForm;
