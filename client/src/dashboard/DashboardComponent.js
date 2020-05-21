import React from 'react';
import PropTypes from "prop-types";
import { Typography, Select, Table } from "antd";
import ChatView from './views/ChatView';

const { Title } = Typography;
const { Option } = Select;

const columns = [
  {
    title: '# Ticket',
    dataIndex: 'ticketId',
  },
  {
    title: 'User',
    dataIndex: 'recipient',
  },
  {
    title: 'Last Message',
    dataIndex: 'lastMessage',
    render: (lastMessage) => (
      <span>{lastMessage.content}</span>
    )
  },
];

class DashboardComponent extends React.PureComponent {

    render() {
      const { guilds, handleSwitchGuild, tickets, messages, currentTicket, handleClickTicket, handleLeaveTicket, handleClickSendMessage, handleCloseTicket } = this.props;

      console.log(tickets);
      console.log("messages", messages);
      console.log("current ticket", currentTicket);

      if (currentTicket) {
        return (
          <ChatView 
            ticket={currentTicket} 
            messages={messages} 
            handleLeaveTicket={handleLeaveTicket} 
            handleClickSendMessage={handleClickSendMessage}
            handleCloseTicket={handleCloseTicket}
          />
        );
      }

      return (
        <div>
          <Title level={2}>Welcome</Title>
          <Select defaultValue="none" style={{ minWidth: 120, marginBottom: 20 }} onChange={(guild) => handleSwitchGuild(guild)}>
            <Option key="none" value="none" disabled={guilds.length <= 0}>None</Option>
            {guilds.map(guild => (
                <Option key={guild.id} value={guild.id}>{guild.name}</Option>
            ))}
          </Select>
          <div>
            {guilds.length > 0 ? (
              tickets.length <= 0 ? (
                <span>No open tickets on this guild !</span>
              ) : (
                <Table 
                  style={{ cursor: "pointer" }} 
                  rowKey="ticketId" 
                  columns={columns} 
                  dataSource={tickets} 
                  onRow={(ticket, index) => {
                    return {
                      onClick: () => handleClickTicket(ticket)
                    };
                  }} 
                />
              )
            ) : (
              <span>You do not share any guild where you are admin with the bot ! You can invite him by clicking <a href="https://discord.com/oauth2/authorize?client_id=712727381177270283&scope=bot" target="_blank" rel="noopener noreferrer">this link !</a></span>
            )}
          </div>
        </div>
      );
    }
}

DashboardComponent.propTypes = {
  guilds: PropTypes.array.isRequired,
  handleSwitchGuild: PropTypes.func.isRequired,
  handleClickTicket: PropTypes.func.isRequired,
  handleLeaveTicket: PropTypes.func.isRequired,
  handleClickSendMessage: PropTypes.func.isRequired,
  handleCloseTicket: PropTypes.func.isRequired,
  tickets: PropTypes.array.isRequired,
  currentTicket: PropTypes.object,
  messages: PropTypes.array.isRequired
};

export default DashboardComponent;
