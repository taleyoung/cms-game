import React, { Component } from "react";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

export default class Pie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieData: []
    };
  }
  componentDidMount() {
    const { id, title } = this.props;
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption({
      title: {
        text: title,
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: "用户人数",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: this.state.pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          color: [
            "#c23531",

            "#61a0a8",
            "#d48265",
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
    const { id } = this.props;
    var myChart = echarts.init(document.getElementById(id));
    const { pieData } = nextProps;
    this.setState(
      {
        pieData
      },
      function() {
        myChart.setOption({
          series: [
            {
              data: pieData
            }
          ]
        });
      }
    );
  }
  render() {
    return <div id={this.props.id} style={{ width: 400, height: 400 }} />;
  }
}
