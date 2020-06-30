/*
 *   Copyright (c) 2020 Lucien Blunk-Lallet

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import PropTypes from "prop-types";
import { PageHeader, Button } from "antd";
import Markdown from "react-markdown";
import { MessageList, Input } from 'react-chat-elements';
import { messages } from '../selectors';

class ChatView extends React.PureComponent {

    state = { message: "" };

    inputRef = React.createRef();
    messagesEndRef = React.createRef();

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }

    scrollToBottom = () => {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    _handleSendMessage = () => {
        const { handleClickSendMessage } = this.props;
        const { message } = this.state;
        handleClickSendMessage(message);
        this.inputRef.clear();
    }

    render() {
      const { messages, ticket, handleLeaveTicket, handleCloseTicket } = this.props;

      return (
        <div>
            <PageHeader
                onBack={handleLeaveTicket}
                title={`Ticket # ${ticket.ticketId}`}
                extra={[
                    <Button type="primary" danger onClick={handleCloseTicket}>
                        Close ticket
                    </Button>
                ]}
            />
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                <div style={{ overflow: "scroll", height: window.innerHeight * 0.7 }}>
                    <MessageList
                        dataSource={
                            messages.map(msg => {
                                return {
                                    position: ticket.authorID === msg.author.id ? 'left' : 'right',
                                    type: msg.attachments.length > 0 ? "photo" : "text",
                                    text: msg.cleanContent ? msg.cleanContent : msg.content,
                                    date: new Date(msg.createdTimestamp),
                                    data: msg.attachments.length > 0 ? {
                                        uri: msg.attachments[0],
                                    } : {}
                                }
                            })
                        }
                    />
                    <div ref={this.messagesEndRef} />
                </div>
                <div style={{ marginTop: 20, position: "sticky" }}>
                    <Input
                        ref={el => (this.inputRef = el)}
                        placeholder="Message..."
                        multiline={true}
                        rightButtons={
                            <Button type="primary" onClick={this._handleSendMessage}>Send</Button>
                        }
                        onChange={e => this.setState({ message: e.target.value })} 
                    />
                </div>
            </div>
        </div>
      );
    }
}

ChatView.propTypes = {
    ticket: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    handleLeaveTicket: PropTypes.func.isRequired,
    handleClickSendMessage: PropTypes.func.isRequired,
    handleCloseTicket: PropTypes.func.isRequired,
};

export default ChatView;
