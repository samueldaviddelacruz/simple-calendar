import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CalendarDay from "./CalendarDay";
import {  parse } from "date-fns";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const startMonthDate = parse("2019-12-08", "yyyy-MM-dd",new Date());
  const dayDate = parse("2019-12-08", "yyyy-MM-dd",new Date());
  const reminders = {
    "2019-12-08": {
      "2019-12-08T10:53:49": {
        reminderDayId: "2019-12-08",
        id: "2019-12-08T10:53:49",
        text: "toyota",
        city: "3492908",
        date: new Date("2019-12-08T10:53:49"),
        color: "#c41bda",
        weatherInfo: {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }
      }
    }
  };
  const props = {
    reminders,
    startMonthDate,
    dayDate,
    onReminderSelected: jest.fn()
  };

  const enzymeWrapper = mount(<CalendarDay {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("CalendarDay", () => {
  it("should render reminders", () => {
    const { enzymeWrapper } = setup();
    const reminders = enzymeWrapper.find(".reminder")
    expect(reminders).toHaveLength(1);
  });
});
