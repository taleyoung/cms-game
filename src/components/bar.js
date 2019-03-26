import React, { Component } from "react";

import echarts from "echarts/lib/echarts";

import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

export default class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xData: [],
      yData: []
    };
  }
  componentDidMount() {
    var myChart = echarts.init(document.getElementById("bar"));
    const { xData, yData } = this.props;
    this.setState({
      xData,
      yData
    });
    myChart.setOption({
      title: { text: "用户数据展示", x: "center" },
      tooltip: {},
      xAxis: {
        type: "category",
        data: xData,
        axisLabel: {
          interval: 0, //横轴信息全部显示
          rotate: -15 //-15度角倾斜显示
        }
      },
      yAxis: { type: "value" },

      series: [
        {
          type: "bar",
          data: yData,
          color: [
            "#91c7ae",
            "#749f83",
            "#ca8622",
            "#bda29a",
            "#6e7074",
            "#546570",
            "#c4ccd3"
          ]
        }
      ]
    });
  }
  componentWillReceiveProps(nextProps) {
    var myChart = echarts.init(document.getElementById("bar"));
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
    return <div id="bar" style={{ width: 1000, height: 400 }} />;
  }
}
