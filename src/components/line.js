import React, { Component } from "react";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

export default class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xData: [],
      yData: []
    };
  }
  componentDidMount() {
    var myChart = echarts.init(document.getElementById("line"));
    myChart.setOption({
      title: {
        text: this.props.title,
        x: "center"
      },
      xAxis: {
        type: "category",
        data: []
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [],
          type: "line"
        }
      ]
    });
  }
  componentWillReceiveProps(nextProps) {
    var myChart = echarts.init(document.getElementById("line"));
    const { xData, yData } = nextProps;
    this.setState(
      {
        xData,
        yData
      },
      function() {
        myChart.setOption({
          xAxis: {
            data: xData
          },
          series: [
            {
              data: yData
            }
          ]
        });
      }
    );
  }
  render() {
    return <div id="line" style={{ width: 900, height: 400 }} />;
  }
}
