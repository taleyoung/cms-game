import React, { Component } from "react";
import { Table, Divider, Modal, Input, message } from "antd";
import Bar from "../components/bar";
import Pie from "../components/pie";
import Axios from "axios";
export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      barYData: [],
      columns: [],
      tableData: [],
      xData: [],
      genderNum: {
        male: 0,
        femaleNum: 0
      },
      schoolNum: {
        xidian: 0,
        xiwai: 0,
        xibei: 0,
        xigongda: 0,
        shanshida: 0,
        xijiao: 0,
        xijian: 0,
        changda: 0
      },
      token: "",
      modal: {
        modalVisible: false,
        modalLoading: false
      },
      inputValue: "",
      openId: ""
    };
  }

  componentDidMount() {
    this.getUserList(1);
  }
  getUserList = page => {
    Axios.get(`http://gametgt.wizzstudio.com/manage/userlist`)
      .then(result => {
        const userList = result.data;
        this.setState(
          {
            userList
          },
          function() {
            this.getInfo();
          }
        );
      })
      .catch(err => {
        console.log("err", err);
      });
  };
  handleInput = e => {
    this.setState({
      inputValue: e.target.value
    });
  };
  toChat = record => {
    this.setState({
      modal: {
        modalVisible: true
      },
      openId: record.openId
    });
  };
  toBlock = record => {
    let blockUrl = "block";
    if (record.state === "BLOCKED") {
      blockUrl = "unblock";
    }
    Axios.get(
      `http://gametgt.wizzstudio.com/manage/user/${blockUrl}?openId=${
        record.openId
      }`
    )
      .then(response => {
        const res = response.data;
        if (res.code === 0) {
          console.log("封号成功");
          this.alertMessage("SUCCESS");
          this.getUserList(this.state.pageNum);
        } else {
          console.log("封号失败");
          this.alertMessage("ERROR");
        }
      })
      .catch(err => {
        console.log("err", err);
        this.alertMessage("ERROR");
      });
  };
  handleOk = () => {
    this.setState({
      modal: {
        modalLoading: true
      }
    });
    const { openId } = this.state;
    const content = this.state.inputValue;
    console.log("content", content);
    Axios.get(
      `http://gametgt.wizzstudio.com/manage/user/chat?openId=${openId}&content=${content}`,
      {
        openId,
        content
      }
    )
      .then(response => {
        console.log("response", response);
        this.setState({
          modal: {
            modalVisible: false,
            modalLoading: false
          },
          inputValue: ""
        });
        this.alertMessage("SUCCESS");
      })
      .catch(err => {
        console.log("err", err);
      });
  };
  alertMessage = state => {
    if (state === "SUCCESS") {
      message.success("操作成功");
    } else if ((state = "ERROR")) {
      message.error("操作失败");
    }
  };
  handleCancel = () => {
    this.setState({
      modal: {
        modalVisible: false
      },
      inputValue: ""
    });
  };
  // getWxName = openId => {
  //   this.getToken();
  //   const { token, nicknameList } = this.state;
  //   let wxName = "";
  //   Axios.get(
  //     `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openId}&lang=zh_CN`
  //   )
  //     .then(response => {
  //       console.log("weixin response", response.data);
  //       const data = response.data;
  //       wxName = data.nickname;
  //       console.log("函数里面的wxname", wxName);
  //       nicknameList.push({
  //         openid: data.openid,
  //         nickname: data.nickname
  //       });
  //       this.setState({
  //         nicknameList
  //       });
  //       return response.data.nickname;
  //     })
  //     .catch(err => {
  //       console.log("err", err);
  //     });
  //   return wxName;
  // };
  getInfo() {
    const { userList } = this.state;
    const columns = [
      {
        title: "用户id",
        dataIndex: "name",
        key: "name",
        width: "100px"
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        width: "100px",
        filters: [
          {
            text: "男生",
            value: "男生"
          },
          {
            text: "女生",
            value: "女生"
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.gender.indexOf(value) === 0
      },
      {
        title: "学校",
        key: "school",
        dataIndex: "school",
        width: "280px"
      },
      {
        title: "游戏",
        key: "games",
        dataIndex: "games",
        width: "160px"
      },
      {
        title: "发起匹配次数",
        key: "sendMatches",
        dataIndex: "sendMatches",
        width: "180px",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.sendMatches - b.sendMatches,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "匹配次数",
        key: "allMatches",
        dataIndex: "allMatches",
        width: "130px",
        sorter: (a, b) => a.sendMatches - b.sendMatches,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "主动断开次数",
        key: "initDisconnected",
        dataIndex: "initDisconnected",
        width: "180px",
        sorter: (a, b) => a.sendMatches - b.sendMatches,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "被断开次数",
        key: "cusDisconnected",
        dataIndex: "cusDisconnected",
        width: "160px",
        sorter: (a, b) => a.sendMatches - b.sendMatches,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "找回次数",
        key: "getBackTime",
        dataIndex: "getBackTime",
        width: "160px",
        sorter: (a, b) => a.sendMatches - b.sendMatches,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "操作",
        key: "action",
        width: "200px",
        render: (text, record) => (
          <span>
            <a
              href="javascript:void(0)"
              onClick={this.toChat.bind(this, record)}>
              私信
            </a>
            <Divider type="vertical" />
            <a
              href="javascript:void(0)"
              onClick={this.toBlock.bind(this, record)}>
              {record.state === "BLOCKED" ? "解封" : "封号"}
            </a>
          </span>
        )
      }
    ];

    let barMatches = 0,
      barDeclaration = 0,
      barSuccessMatches = 0,
      barValidChat = 0,
      barPassiveDisconnected = 0,
      barUserDisconnected = 0,
      barGetBackTime = 0;
    let genderNum = {
        male: 0,
        female: 0
      },
      schoolNum = {
        xidian: 0,
        xiwai: 0,
        jianzhu: 0,
        xijiao: 0,
        gongda: 0
      };

    const tableData = [];
    userList.forEach((item, index) => {
      let allMatches = 0,
        initDisconnected = 0,
        cusDisconnected = 0,
        getBackTime = 0;
      barMatches += item.matches.length;
      if (item.gender === "MALE") {
        genderNum.male++;
      } else if (item.gender === "FEMALE") {
        genderNum.female++;
      }
      switch (item.school) {
        case "西安电子科技大学":
          schoolNum.xidian++;
          break;
        case "西安外国语大学":
          schoolNum.xiwai++;
          break;
        case "西北大学":
          schoolNum.xibei++;
          break;
        case "西北工业大学":
          schoolNum.xigongda++;
          break;
        case "陕西师范大学":
          schoolNum.shanshida++;
          break;
        case "西安交通大学":
          schoolNum.xijiao++;
          break;
        case "西安建筑科技大学":
          schoolNum.xijian++;
          break;
        case "长安大学":
          schoolNum.changda++;
          break;
        default:
          break;
      }
      item.matches.forEach(match => {
        getBackTime += match.getBackTime;
        barGetBackTime += match.getBackTime;
        if (match.declaration) {
          barDeclaration++;
        }
        switch (match.state) {
          case "INITIATOR_DISCONNECTED":
            allMatches++;
            initDisconnected++;
            barSuccessMatches += 1;
            barUserDisconnected++;
            break;
          case "CUSTOMER_DISCONNECTED":
            allMatches++;
            cusDisconnected++;
            barSuccessMatches += 1;
            barUserDisconnected++;
            break;
          case "FAILED ":
            break;
          case "WAITING ":
            break;
          case "PASSIVE_DISCONNECTED":
            allMatches++;
            barSuccessMatches += 1;
            barPassiveDisconnected++;
            break;
          default:
            break;
        }
        switch (match.chatState) {
          case "INITIATOR_ONLY":
            break;
          case "CUSTOMER_ONLY":
            break;
          case "NONE":
            break;
          case "VAILD":
            barValidChat++;
            break;
          default:
            break;
        }
      });

      tableData.push({
        key: index,
        name: item.id,
        gender: item.gender === "MALE" ? "男生" : "女生",
        school: item.school,
        games: item.games === null ? "无" : item.games + " ",
        sendMatches: item.matches.length,
        allMatches: allMatches,
        initDisconnected: initDisconnected,
        cusDisconnected: cusDisconnected,
        getBackTime: getBackTime,
        chats: "聊天",
        openId: item.openId,
        state: item.state
      });
    });

    const xData = [
      "已填写信息人数",
      "已发送匹配",
      "已发送匹配宣言",
      "匹配成功",
      "完成有效聊天",
      "系统自动断开聊天",
      "用户主动断开聊天",
      "找回聊天用户"
    ];

    let barYData = [
      userList.length,
      barMatches,
      barDeclaration,
      barSuccessMatches,
      barValidChat,
      barPassiveDisconnected,
      barUserDisconnected,
      barGetBackTime
    ];
    this.setState({
      barYData,
      columns,
      tableData,
      xData,
      genderNum,
      schoolNum
    });
  }
  render() {
    const {
      columns,
      tableData,
      xData,
      barYData,
      genderNum,
      schoolNum,
      modal,
      inputValue
    } = this.state;
    const pieGenderData = [
      { value: genderNum.male, name: "男生" },
      { value: genderNum.female, name: "女生" }
    ];
    const pieSchoolData = [
      {
        value: schoolNum.xidian,
        name: "西安电子科技大学"
      },
      {
        value: schoolNum.xiwai,
        name: "西安外国语大学"
      },
      {
        value: schoolNum.xijiao,
        name: "西安交通大学"
      },
      {
        value: schoolNum.xibei,
        name: "西北工业大学"
      },
      {
        value: schoolNum.shanshida,
        name: "陕西师范大学"
      },
      {
        value: schoolNum.xijiao,
        name: "西安交通大学"
      },
      {
        value: schoolNum.xijian,
        name: "西安建筑科技大学"
      },
      {
        value: schoolNum.changda,
        name: "长安大学"
      }
    ];
    const { TextArea } = Input;

    return (
      <div>
        <div style={{ margin: "50px auto" }}>
          <Bar xData={xData} yData={barYData} />
        </div>
        <div className="pie-wrap">
          <div>
            <Pie
              pieData={pieGenderData}
              id={"gender-pie"}
              title={"用户性别分析"}
            />
          </div>
          <div>
            <Pie
              pieData={pieSchoolData}
              id={"school-pie"}
              title={"用户学校分析"}
            />
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey="key"
            bordered
          />
          {/* <Pagination
            defaultCurrent={1}
            pageSize={5}
            total={pageTotal}
            onChange={this.getUserList}
            style={{ marginTop: "20px", float: "right" }}
          /> */}
          <Modal
            title="私信用户"
            visible={modal.modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            confirmLoading={modal.modalLoading}>
            <TextArea rows={4} onChange={this.handleInput} value={inputValue} />
          </Modal>
        </div>
      </div>
    );
  }
}
