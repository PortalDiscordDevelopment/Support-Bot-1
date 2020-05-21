import React from 'react';
import PropTypes from "prop-types";
import { PageHeader, Input } from "antd";
import Markdown from "react-markdown";

const { Search } = Input;

class ChatView extends React.PureComponent {

    render() {
      const { messages, ticket, handleLeaveTicket, handleClickSendMessage } = this.props;

      return (
        <div>
            <PageHeader
                onBack={handleLeaveTicket}
                title={`Ticket # ${ticket.ticketId}`}
            />
        
            <div>
                {messages.map(msg => (
                    <div style={{ width: '100%', backgroundColor: "white", borderRadius: 14, padding: 20, marginBottom: 20 }}>
                        <Markdown source={msg.content} />
                        <br />
                    </div>
                ))}
                <Search
                    placeholder="Message"
                    enterButton="Send"
                    size="large"
                    onSearch={handleClickSendMessage}
                />
            </div>
        </div>
      );
    }
}

ChatView.propTypes = {
    ticket: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    handleLeaveTicket: PropTypes.func.isRequired,
    handleClickSendMessage: PropTypes.func.isRequired
};

export default ChatView;