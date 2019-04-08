"use strict";
import * as React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import { connect } from 'react-redux';

import { Card, DatePicker, Switch, Row, Col } from 'antd';
import moment from 'moment';

import { getReport } from  '../actions/reportActions';


require('./Report.css');


interface reportObject {
  recipients: [{date: '', count: number }];
  optins: [{date: '', count: number }];
}

export interface Props{
  report: reportObject;
  getReport: (x,y) => void;
}


export interface MyInterface extends Array<Props> { }

class Report extends React.Component<Props>{

  state = {
    dateFromPicked: '2018/11/01',
    dateToPicked: '2018/11/08',
    fields: ["Optins", "Recipients"],
    optins: [],
    recipients: [],
    reportData: []
  }
  
  onRecipientsChange = checked => {
    if(checked) {
      this.setState({fields: ["Optins", "Recipients"]});
    } else {
      this.setState({fields: ["Optins", ""]});
    }
  }

  onOptinsChange = checked => {
    if(checked) {
      this.setState({fields: ["Optins", "Recipients"]});
    } else {
      this.setState({fields: ["", "Recipients"]});
    }
  }

  datePicked = (old, pickedDate) =>{

    this.props.getReport(this.state.dateFromPicked, this.state.dateToPicked);

    this.setState({
      dateFromPicked: pickedDate[0].toString(), 
      dateToPicked: pickedDate[1].toString(),
      optins: this.props.report.optins,
      recipients: this.props.report.recipients
    });

    this.loadDataReport(this.state.optins, this.state.recipients);
  }

  componentDidMount(){
    this.props.getReport(this.state.dateFromPicked, this.state.dateToPicked);

    this.setState({
      optins: this.props.report.optins,
      recipients: this.props.report.recipients
    });
    
    this.loadDataReport(this.state.optins, this.state.recipients);
  }

  loadDataReport(optins, recipients){

    let reportData = [];
    
    if(optins.length !== undefined && recipients.length !== undefined){
      optins.map(optin => {
        recipients.map(recipient => {
          if(optin.date === recipient.date){
            reportData.push({
              date: optin.date,
              Optins: optin.count,
              Recipients: recipient.count
            })
          }
        }) 
      });

      this.setState({
        reportData: reportData
      });
    }
  }
  
  render() {

    console.log(this.state.reportData);

    const data = [
      {
        date: "Jan/11",
        Optins: 7.0,
        Recipients: 3.9
      },
      {
        date: "Feb",
        Optins: 6.9,
        Recipients: 4.2
      },
      {
        date: "Mar",
        Optins: 9.5,
        Recipients: 5.7
      },
      {
        date: "Apr",
        Optins: 14.5,
        Recipients: 8.5
      },
      {
        date: "May",
        Optins: 18.4,
        Recipients: 11.9
      },
      {
        date: "Jun",
        Optins: 21.5,
        Recipients: 15.2
      },
      {
        date: "Jul",
        Optins: 25.2,
        Recipients: 17.0
      },
      {
        date: "Aug",
        Optins: 26.5,
        Recipients: 16.6
      },
      {
        date: "Sep",
        Optins: 23.3,
        Recipients: 14.2
      },
      {
        date: "Oct",
        Optins: 18.3,
        Recipients: 10.3
      },
      {
        date: "Nov",
        Optins: 13.9,
        Recipients: 6.6
      },
      {
        date: "Dec",
        Optins: 9.6,
        Recipients: 4.8
      }
    ];
    
    const ds = new DataSet();
    const dv = ds.createView().source(this.state.reportData);

    dv.transform({
      type: "fold",
      fields: this.state.fields,
      key: "city",
      value: "optins" 
    });

    const cols = {
      date: {
        range: [0, 1]
      }
    };

    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';

    return (
      <div>
        <Card style={{ margin: '0 0 20px 0'}}>
          <Row style={{padding: '10px 0' }}>
            <Col span={2}>Date Range:</Col>
            <Col span={22}>
              <RangePicker
                defaultValue={[
                  moment(this.state.dateFromPicked, dateFormat),
                  moment(this.state.dateToPicked, dateFormat)
                ]}
                format={dateFormat}
                onChange={this.datePicked}
              />
            </Col>
          </Row>
          <Row style={{padding: '10px 0' }}>
            <Col span={2}>Show Options:</Col>
            <Col span={22}>
              <Switch defaultChecked className="optins" onChange={this.onOptinsChange} />
            </Col>
          </Row>
          <Row style={{padding: '10px 0' }}>
            <Col span={2}>Show Recipients:</Col>
            <Col span={22}>
              <Switch defaultChecked className="recipients" onChange={this.onRecipientsChange} />
            </Col>
          </Row>
        </Card>
        <Card>
          <Chart width={100} height={500} data={dv} scale={cols} forceFit>
              <Legend />
              <Axis name="date" />
              <Axis
                  name="optins"
                  label={false}
              />
              <Tooltip
                  crosshairs={{
                      type: "y"
                  }}
              />
              <Geom
                  type="line"
                  position="date*optins"
                  size={2}
                  color={"city"}
              />
              <Geom
                  type="point"
                  position="date*optins"
                  size={4}
                  shape={"circle"}
                  color={"city"}
                  style={{
                      stroke: "#fff",
                      lineWidth: 1
                  }}
              />
          </Chart>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  report: state.report
});

export default connect(mapStateToProps, { getReport })(Report);