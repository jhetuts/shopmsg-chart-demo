import React, { Component } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';

class DatePicker extends Component {
  render() {
    const { MonthPicker, RangePicker } = DatePicker;

    const dateFormat = 'YYYY/MM/DD';
    return (
      <div>
        <RangePicker
            defaultValue={[moment('2015/01/01', dateFormat), 
            moment('2015/01/01', dateFormat)]}
            format={dateFormat}
        />
      </div>
    )
  }
}


export default DatePicker;