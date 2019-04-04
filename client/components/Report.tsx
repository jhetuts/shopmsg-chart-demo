"use strict";
import * as React from 'react';
import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from 'bizcharts';
import DataSet from '@antv/data-set';

export default class Report extends React.Component {
  render() {
    const data = [
      {
        month: "Jan",
        Optins: 7.0,
        Recipients: 3.9
      },
      {
        month: "Feb",
        Optins: 6.9,
        Recipients: 4.2
      },
      {
        month: "Mar",
        Optins: 9.5,
        Recipients: 5.7
      },
      {
        month: "Apr",
        Optins: 14.5,
        Recipients: 8.5
      },
      {
        month: "May",
        Optins: 18.4,
        Recipients: 11.9
      },
      {
        month: "Jun",
        Optins: 21.5,
        Recipients: 15.2
      },
      {
        month: "Jul",
        Optins: 25.2,
        Recipients: 17.0
      },
      {
        month: "Aug",
        Optins: 26.5,
        Recipients: 16.6
      },
      {
        month: "Sep",
        Optins: 23.3,
        Recipients: 14.2
      },
      {
        month: "Oct",
        Optins: 18.3,
        Recipients: 10.3
      },
      {
        month: "Nov",
        Optins: 13.9,
        Recipients: 6.6
      },
      {
        month: "Dec",
        Optins: 9.6,
        Recipients: 4.8
      }
    ];
    
    const ds = new DataSet();
    const dv = ds.createView().source(data);

    dv.transform({
      type: "fold",
      fields: ["Optins", "Recipients"],
      key: "city",
      value: "temperature" 
    });

    const cols = {
      month: {
        range: [0, 1]
      }
    };

    return (
        <Chart height={500} data={dv} scale={cols} forceFit>
            <Legend />
            <Axis name="month" />
            <Axis
                name="temperature"
                label={false}
            />
            <Tooltip
                crosshairs={{
                    type: "y"
                }}
            />
            <Geom
                type="line"
                position="month*temperature"
                size={2}
                color={"city"}
            />
            <Geom
                type="edge"
                position="month*temperature"
                size={4}
                shape={"circle"}
                color={"red"}
                style={{
                    stroke: "#fff",
                    lineWidth: 1
                }}
            />
        </Chart>
    );
  }
}