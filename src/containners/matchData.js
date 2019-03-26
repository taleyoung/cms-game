import React, { Component } from "react";
import { Table, Modal, List, Avatar } from "antd";
import Axios from "axios";
export default class MatchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoList: [],
      tableData: [],
      columns: [],
      modalVisible: false,
      chatContent: [],
      pageTotal: 10,
      token: ""
    };
  }
  componentDidMount() {
    this.getChatList();
  }
  getChatList = () => {
    Axios.get(`http://gametgt.wizzstudio.com/manage/matchlist`)
      .then(response => {
        const infoList = response.data;
        this.setState(
          {
            infoList
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
  getChats(record) {
    const matchId = record.id;
    this.setState({
      modalVisible: true
    });
    Axios.get(
      `http://gametgt.wizzstudio.com/manage/match/detail?matchId=${matchId}`
    )
      .then(response => {
        const chatContent = response.data;
        this.setState({
          chatContent
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }
  handleOk = () => {
    this.setState({
      modalVisible: false
    });
  };
  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };
  handleTime = str => {
    const time = str.slice(0, 10) + " " + str.slice(11, 19);
    return time;
  };
  getInfo() {
    const { infoList } = this.state;
    const columns = [
      {
        title: "编号",
        key: "id",
        dataIndex: "id",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.sendMatches - b.sendMatches,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "发起人id",
        key: "initiatorId",
        dataIndex: "initiatorId",
        width: "100px"
      },
      {
        title: "被匹配者id",
        key: "customerId",
        dataIndex: "customerId",
        width: "120px"
      },

      {
        title: "发起时间",
        key: "matchTime",
        dataIndex: "matchTime",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.sendMatches - b.sendMatches,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "最后活跃时间",
        key: "lastActiveTime",
        dataIndex: "lastActiveTime",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.sendMatches - b.sendMatches,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "游戏名称",
        key: "gameName",
        dataIndex: "gameName",
        filters: [
          {
            text: "qq吃鸡",
            value: "qq吃鸡"
          },
          {
            text: "qq王者",
            value: "qq王者"
          },
          {
            text: "微信吃鸡",
            value: "微信吃鸡"
          },
          {
            text: "微信王者",
            value: "微信王者"
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.gameName.indexOf(value) === 0
      },
      {
        title: "是否有效聊天",
        key: "validChat",
        dataIndex: "validChat"
      },
      {
        title: "聊天内容",
        key: "chats",
        render: (text, record) => (
          <span>
            <a onClick={this.getChats.bind(this, record)}>查看</a>
          </span>
        )
      }
    ];
    const handleName = str => {
      switch (str) {
        case "QQCHIJI":
          return "qq吃鸡";
        case "QQWANGZHE":
          return "qq王者";
        case "WEIXINCHIJI":
          return "微信吃鸡";
        case "WEIXINWANGZHE":
          return "微信王者";
        case "NONE":
          return "无效聊天";
        case "INITIATOR_ONLY":
          return "仅发起者发言";
        case "CUSTOMER_ONLY":
          return "仅被匹配者发言";
        case "VAILD":
          return "有效聊天";
        default:
          break;
      }
    };

    let tableData = [];
    infoList.forEach(item => {
      tableData.push({
        id: item.id,
        initiatorId: item.iniId,
        customerId: item.cusId,
        matchTime: this.handleTime(item.matchTime),
        lastActiveTime: this.handleTime(item.lastActiveTime),
        gameName: item.gameName,
        validChat: handleName(item.chatState),
        chats: "聊天"
      });
    });
    this.setState({
      tableData,
      columns
    });
  }
  render() {
    const { columns, tableData, modalVisible, chatContent } = this.state;
    return (
      <div>
        <Table columns={columns} dataSource={tableData} rowKey="id" />
        {/* <Pagination
          defaultCurrent={1}
          pageSize={10}
          total={pageTotal}
          onChange={this.getChatList}
          style={{ marginTop: "20px", float: "right" }}
        /> */}

        <Modal
          title="查看聊天记录"
          visible={modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable={false}>
          <List
            dataSource={chatContent}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon="user"
                    />
                  }
                  title={this.handleTime(item.time)}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </Modal>
      </div>
    );
  }
}
