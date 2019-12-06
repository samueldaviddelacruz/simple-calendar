import React from "react";
import * as moment from 'moment';
import { Form, Select, Input, DatePicker, Modal } from "antd";
const { Option } = Select;

const UpdateReminder = props => {
  
  const {text,city,color,id,reminderDayId} = props.reminder;
  const date = moment(props.reminder.date)
  
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
    
        const reminder = {...values,date:values.date.toDate()  }

        props.onFormSubmit(reminder)
        props.hideForm()
        props.form.resetFields()
      }
    });
  };

  const onAddReminderCancel = (e) => {
    props.hideForm()
  }

 
  const { getFieldDecorator } = props.form;
 
  getFieldDecorator("id", {
    initialValue: id
  })
  getFieldDecorator("reminderDayId", {
    initialValue: reminderDayId
  })
  return (
    <Modal
      title="Edit Reminder"
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
            ],
            initialValue: text
          })(<Input.TextArea placeholder="Buy groceries..." />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator("city", {
            rules: [{ required: true, message: "Please select a city!" }],
            initialValue: city
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
            ],
            initialValue: date
          })(<DatePicker showTime placeholder="Select A Day and time" />)}
        </Form.Item>
        <Form.Item label="Color">
          {getFieldDecorator("color", {
            rules: [
              { required: true, message: "Please select a color!" }
            ],
            initialValue: color
          })(<Input type="color" placeholder="Buy groceries..."  style={{ width: 120 }}/>)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const WrappedUpdateReminderForm = Form.create({ name: "update_reminder_form" })(
    UpdateReminder
);

export default WrappedUpdateReminderForm;
