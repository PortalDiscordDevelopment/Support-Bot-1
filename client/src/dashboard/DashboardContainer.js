import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
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

    render() {
        const { guilds, tickets, messages, currentTicket } = this.props;

        return (
            <DashboardComponent
                guilds={guilds}
                handleSwitchGuild={this._handleSwitchGuild}
                handleClickTicket={this._handleClickTicket}
                handleLeaveTicket={this._handleLeaveTicket}
                handleClickSendMessage={this._handleClickSendMessage}
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

export default withRouter(connect(mapStateToProps)(DashboardContainer));
