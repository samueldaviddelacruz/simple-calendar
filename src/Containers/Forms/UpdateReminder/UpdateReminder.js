import React, { useEffect} from "react";
import * as moment from "moment";
import { Form, Select, Input, DatePicker, Modal } from "antd";
import useWeather from "../../../Hooks/useWeather";
import WeatherIcon from "../../../Components/UI/WeatherIcon/WeatherIcon";

const { Option } = Select;

const UpdateReminder = props => {
  const {
    searchWeather,
    isLoadingWeather,
    findClosestWeather,
    closestWeatherForecast,
    resetWeatherForecast
  } = useWeather();
  const { text, city, color, id, reminderDayId } = props.reminder;
  const { getFieldDecorator, getFieldValue } = props.form;
  const date = moment(props.reminder.date);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const reminder = { ...values, date: values.date.toDate() };
        props.onFormSubmit(reminder);
        props.hideForm();
        props.form.resetFields();
        resetWeatherForecast();
      }
    });
  };

  const onAddReminderCancel = e => {
    props.hideForm();
  };

  const selectedCityId = getFieldValue("city");
  const selectedDate = getFieldValue("date");

  useEffect(() => {
    if (selectedDate) {
      findClosestWeather(selectedDate.toDate());
    }
  }, [findClosestWeather, selectedDate, selectedCityId]);

  const onCityChange = async value => {
    await searchWeather(value);
  };
  const onDateChange = async value => {
    await searchWeather(selectedCityId);
  };

  getFieldDecorator("id", {
    initialValue: id
  });
  getFieldDecorator("reminderDayId", {
    initialValue: reminderDayId
  });
  getFieldDecorator("weatherInfo", {
    initialValue: (closestWeatherForecast || props.reminder.weatherInfo)
  })
  return (
    <Modal
      title="Edit Reminder"
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
            ],
            initialValue: text
          })(<Input.TextArea placeholder="Buy groceries..." />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator("city", {
            rules: [{ required: true, message: "Please select a city!" }],
            initialValue: city
          })(
            <Select style={{ width: 200 }} onChange={onCityChange}>
              <Option value="5128638">New York</Option>
              <Option value="3492908">Santo Domingo</Option>
              <Option value="2643744">London</Option>
            </Select>
          )}
          {props.reminder.weatherInfo && (
            <WeatherIcon {...(closestWeatherForecast || props.reminder.weatherInfo)}></WeatherIcon>
          )}
        </Form.Item>
        <Form.Item label="Date and Time">
          {getFieldDecorator("date", {
            rules: [
              { required: true, message: "Please select a date and time" }
            ],
            initialValue: date
          })(<DatePicker showTime placeholder="Select A Day and time" onChange={onDateChange} />)}
        </Form.Item>
        <Form.Item label="Color">
          {getFieldDecorator("color", {
            rules: [{ required: true, message: "Please select a color!" }],
            initialValue: color
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

const WrappedUpdateReminderForm = Form.create({ name: "update_reminder_form" })(
  UpdateReminder
);

export default WrappedUpdateReminderForm;
