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

import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import DashboardComponent from "./DashboardComponent";
import * as actionCreators from "./actionCreators";
import * as selectors from "./selectors";

const mapStateToProps = (state) => ({
    guilds: selectors.guilds(state),
    tickets: selectors.tickets(state),
    currentTicket: selectors.currentTicket(state),
    messages: selectors.messages(state)
});

class DashboardContainer extends React.Component {

    _socket: any;

    async componentDidMount() {
        const { dispatch } = this.props;
        await dispatch(actionCreators.fetchAvailableGuilds());
    }

    _handleSwitchGuild = async (guildId: string) => {
        const { dispatch } = this.props;
        await dispatch(actionCreators.initSocketHandler(guildId));
    }

    _handleClickTicket = async (ticket: any) => {
        const { dispatch } = this.props;
        await dispatch(actionCreators.connectChannel(ticket));
    }

    _handleClickSendMessage = async (message: string) => {
        const { dispatch } = this.props;
        await dispatch(actionCreators.sendMessage(message));
    }

    _handleLeaveTicket = async () => {
        const { dispatch } = this.props;
        await dispatch(actionCreators.disconnectChannel());
    }

    _handleCloseTicket = async () => {
        const { dispatch } = this.props;
        await dispatch(actionCreators.closeTicket());
    }

    render() {
        const { guilds, tickets, messages, currentTicket } = this.props;

        return (
            <DashboardComponent
                guilds={guilds}
                handleSwitchGuild={this._handleSwitchGuild}
                handleClickTicket={this._handleClickTicket}
                handleLeaveTicket={this._handleLeaveTicket}
                handleClickSendMessage={this._handleClickSendMessage}
                handleCloseTicket={this._handleCloseTicket}
                tickets={tickets}
                currentTicket={currentTicket}
                messages={messages}
            />
        );
    }
}

DashboardContainer.propTypes = {
    dispatch: PropTypes.any.isRequired,
    guilds: PropTypes.array.isRequired,
    tickets: PropTypes.array.isRequired,
    currentTicket: PropTypes.object,
    messages: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(DashboardContainer);
