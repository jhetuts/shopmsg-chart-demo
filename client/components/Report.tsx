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
  loading: boolean;
}

export interface Props{
  report: reportObject;
  getReport: (x,y) => void;
}

class Report extends React.Component<Props>{

  state = {
    dateFromPicked: '2018/11/01',
    dateToPicked: '2018/11/08',
    fields: ["Optins", "Recipients"],
    optins: this.props.report.optins,
    recipients: this.props.report.optins,
    reportData: []
  }
  
  onRecipientsChange = checked => {
    if(checked) {
      this.setState({fields: ["Optins", "Recipients"]});
    } else {
      this.setState({fields: ["Optins"]});
    }
  }

  onOptinsChange = checked => {
    if(checked) {
      this.setState({fields: ["Optins", "Recipients"]});
    } else {
      this.setState({fields: ["Recipients"]});
    }
  }

  datePicked = (old, pickedDate) =>{

    this.props.getReport(pickedDate[0].toString(), pickedDate[1].toString());

    this.setState({
      dateFromPicked: pickedDate[0].toString(), 
      dateToPicked: pickedDate[1].toString(),
      optins: this.props.report.optins,
      recipients: this.props.report.recipients
    });
  }

  componentDidMount(){
    this.props.getReport(this.state.dateFromPicked, this.state.dateToPicked);
  }
  
  render() {
    let reportData = new Array<Object>();
    let chartLoad;

    if(!this.props.report.loading){
      if(this.props.report.optins.length !== undefined && this.props.report.recipients.length !== undefined){
        this.props.report.optins.map(optin => {
          this.props.report.recipients.map(recipient => {
            if(optin.date === recipient.date){
              reportData.push({
                date: optin.date,
                Optins: optin.count,
                Recipients: recipient.count
              })
            }
          }) 
        });
      }
      if(reportData.length <= 2){
        chartLoad = (<div>Input date is atleast above 3 days.</div>);
      } else {
        chartLoad = null;
      }
    } else {
      chartLoad = (<div>Loading...</div>);
    }

    const ds = new DataSet();
    const dv = ds.createView().source(reportData);

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
            <Col span={4} className="dp-4">Date Range:</Col>
            <Col span={20}>
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
            <Col span={4} className="dp-4">Show Options:</Col>
            <Col span={20}>
              <Switch defaultChecked className="optins" onChange={this.onOptinsChange} />
            </Col>
          </Row>
          <Row style={{padding: '10px 0' }}>
            <Col span={4} className="dp-4">Show Recipients:</Col>
            <Col span={20}>
              <Switch defaultChecked className="recipients" onChange={this.onRecipientsChange} />
            </Col>
          </Row>
        </Card>
        <Card>
          {chartLoad ? chartLoad : 
          (
            <Chart width={100} height={500} data={dv} scale={cols} forceFit>
              <Legend position="top-left"/>
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
          )}
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  report: state.report
});

export default connect(mapStateToProps, { getReport })(Report);