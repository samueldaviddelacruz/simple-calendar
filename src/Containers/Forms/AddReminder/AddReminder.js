import React, { useEffect } from "react";

import { Form, Select, Input, DatePicker, Modal } from "antd";
import WeatherIcon from "../../../Components/UI/WeatherIcon/WeatherIcon";

import useWeather from "../../../Hooks/useWeather";
import {
  isBefore,
  subHours
} from "date-fns";
const { Option } = Select;
const INITIAL_CITY_ID = "3492908";

const AddReminder = props => {
  const {
    searchWeather,
    isLoadingWeather,
    findClosestWeather,
    closestWeatherForecast,
    resetWeatherForecast
  } = useWeather();
  const { getFieldDecorator, getFieldValue } = props.form;
  console.log("isLoadingWeather", isLoadingWeather);

  const date = getFieldValue("date");
  const selectedCityId = getFieldValue("city");
 
  useEffect(() => {
    if (date) {
      findClosestWeather(date.toDate());
    }
  }, [findClosestWeather,date, selectedCityId]);

  const onCityChange = async value => {
    
    await searchWeather(value);
  };
  const onDateChange = async value => {
    await searchWeather(selectedCityId);
  };
  const handleSubmit = e => {
    props.form.validateFields((err, values) => {
      if (!err) {
        const reminder = { ...values, date: values.date.toDate() };
        console.log(reminder)
        props.onFormSubmit(reminder);
        props.hideForm();
        props.form.resetFields();
        resetWeatherForecast()
      }
    });
  };
  const onAddReminderCancel = e => {
    
    props.hideForm();
    
  };
  getFieldDecorator("weatherInfo", {
    initialValue: closestWeatherForecast
  })
  return (
    <Modal
      title="Add a Reminder"
      visible={props.showForm}
      onOk={handleSubmit}
      onCancel={onAddReminderCancel}
      confirmLoading={isLoadingWeather}
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
            initialValue: INITIAL_CITY_ID
          })(
            <Select style={{ width: 200 }} onChange={onCityChange}>
              <Option value="5128638">New York</Option>
              <Option value="3492908">Santo Domingo</Option>
              <Option value="2643744">London</Option>
            </Select>
          )}
          {closestWeatherForecast && (
            <WeatherIcon {...closestWeatherForecast}></WeatherIcon>
          )}
        </Form.Item>
        <Form.Item label="Date and Time">
          {getFieldDecorator("date", {
            rules: [
              { required: true, message: "Please select a date and time" }
            ]
          })(
            <DatePicker
              showTime
              placeholder="Select A Day and time"
              onChange={onDateChange}
              disabledDate={(currentDate =>{
                const nDate = currentDate.toDate()
                return isBefore(nDate,subHours(Date.now(),1)  )
              })}
            />
          )}
        </Form.Item>
        <Form.Item label="Color">
          {getFieldDecorator("color", {
            rules: [{ required: true, message: "Please select a color!" }],
            initialValue: "#000000"
          })(
            <Input
              type="color"
              placeholder="Buy groceries..."
              style={{ width: 120 }}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const WrappedAddReminderForm = Form.create({ name: "add_reminder_form" })(
  AddReminder
);

export default WrappedAddReminderForm;
