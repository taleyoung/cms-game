import React, { Component } from "react";
import Line from "../components/line";
import { Table, DatePicker, Icon } from "antd";
import Axios from "axios";

export default class UserAmount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xData: [],
      yData: [],
      data: [],
      lineXData: [],
      lineYData: [],
      dateLow: "2019-01-01",
      dateUp: "2019-03-30"
    };
  }

  componentDidMount() {
    this.getInitDate();
  }
  getInitDate = () => {
    let date = new Date();
    let nowMonth = date.getMonth() + 1;
    let strDate = date.getDate() - 1;
    let seperator = "-";
    if (nowMonth >= 1 && nowMonth <= 9) {
      nowMonth = "0" + nowMonth;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let dateUp =
      date.getFullYear() + seperator + nowMonth + seperator + strDate;
    this.setState(
      {
        dateUp
      },
      function() {
        this.getInfo();
        this.getActive();
      }
    );
  };
  getInfo() {
    const { dateLow, dateUp } = this.state;
    Axios.get(
      `http://gametgt.wizzstudio.com/manage/data?low=${dateLow}&up=${dateUp}`
    )
      .then(result => {
        let dataObj = result.data.data;
        let data = [];
        data.push(dataObj);
        this.setState({
          data
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }
  getActive() {
    const { dateLow, dateUp } = this.state;
    Axios.get(
      `http://gametgt.wizzstudio.com/manage/user/active?low=${dateLow}&up=${dateUp}`
    )
      .then(response => {
        const activeObj = response.data.data;
        let lineXData = [],
          lineYData = [];
        activeObj.forEach(item => {
          lineXData.push(item.date.slice(0, 10));
          lineYData.push(item.num);
        });
        this.setState({
          lineXData,
          lineYData
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }
  dateSet = (date, dateList) => {
    this.setState(
      {
        dateLow: dateList[0],
        dateUp: dateList[1]
      },
      function() {
        this.getInfo();
        this.getActive();
      }
    );
  };
  render() {
    const columns = [
      {
        title: "已填写信息用户",
        dataIndex: "vaildUser",
        key: "vaildUser"
      },
      {
        title: "匹配次数",
        dataIndex: "match",
        key: "match"
      },
      {
        title: "宣言填写次数",
        dataIndex: "declaration",
        key: "declaration"
      },
      {
        title: "有效聊天次数",
        dataIndex: "vaildChat",
        key: "vaildChat"
      }
    ];
    const { lineXData, lineYData } = this.state;
    return (
      <div>
        <div className="date-wrap">
          <div>
            <Icon type="profile" theme="twoTone" style={{ fontSize: "20px" }} />
            <span
              style={{
                fontSize: "16px",
                marginLeft: "6px",
                marginRight: "10px"
              }}>
              选择时间
            </span>
          </div>
          <DatePicker.RangePicker onChange={this.dateSet} size="large" />
        </div>
        {this.state.data ? (
          <Table columns={columns} dataSource={this.state.data} rowKey="key" />
        ) : (
          "正在获取数据"
        )}

        <div>
          <Line xData={lineXData} yData={lineYData} title="活跃用户人数分析" />
        </div>
      </div>
    );
  }
}
