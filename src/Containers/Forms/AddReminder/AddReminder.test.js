import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddReminderForm from "./AddReminder";
import moment from "moment";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    onFormSubmit: jest.fn(),
    showForm: true
  };

  const enzymeWrapper = shallow(<AddReminderForm {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("AddReminderForm", () => {
  describe("Modal", () => {
    
    it("should render self and subcomponents", () => {
      const wrapper = mount(<AddReminderForm showForm={true} />);
      const formModalProps = wrapper.find("Modal").props();

      expect(formModalProps.visible).toBe(true);
      expect(formModalProps.title).toEqual("Add a Reminder");
    });

    it("should call onFormSubmit if form is valid", () => {
      const {enzymeWrapper,props} = setup()
      const { getFieldDecorator } = enzymeWrapper.props().form;
      getFieldDecorator("text", {
        initialValue: "Buy Groceries"
      });
      getFieldDecorator("city", {
        initialValue: "NY"
      });
      getFieldDecorator("text", {
        initialValue: "Buy Groceries"
      });
      getFieldDecorator("color", {
        initialValue: "#000000"
      });
      getFieldDecorator("date", {
        initialValue: moment(Date.now())
      });
      const modalProps = enzymeWrapper.dive().props();
      modalProps.onOk()
      expect(props.onFormSubmit.mock.calls.length).toBe(1)
     
    });
  });
});
