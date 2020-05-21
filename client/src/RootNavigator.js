import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { DashboardScreen } from "./dashboard";
import { AuthScreen } from "./auth";
import { selectors as coreSelectors, actionCreators as coreActionCreators } from "./core";
import { Routes } from "./utils";

const { Header, Sider, Content } = Layout;

const mapStateToProps = (state) => ({
  token: coreSelectors.token(state)
});

class RootNavigator extends React.Component {

  state = { initialized: false };

  async componentDidMount(): void {
    const { dispatch } = this.props;

    if (window.location.pathname === "/oauth-redirect") {
        const token = window.location.hash.split("&")[1].split("=")[1];
        await dispatch(coreActionCreators.setToken(token));
    }
    this.setState({ initialized: true });
  }

  render() {
      const { token } = this.props;

      if (!this.state.initialized) return <p>Loading...</p>;

      return (
        <Router>
          {token ? (
            <Layout>
              <Header>
                <Menu theme="dark" mode="horizontal" />
              </Header>
              <Layout>
                <Sider width={200}>
                  <Menu
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                    defaultSelectedKeys="dashboard"
                  >
                    <Menu.Item key="dashboard" icon={<HomeOutlined />}><Link to={Routes.PATH_DASHBOARD}>Dashboard</Link></Menu.Item>
                  </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                  <Content
                    style={{
                      padding: 24,
                      margin: 0,
                      height: '100%',
                    }}
                  >
                    <Switch>
                      <Route path={Routes.PATH_DASHBOARD}>
                        <DashboardScreen />
                      </Route>
                    </Switch>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          ) : (
            <Switch>
              <Route path={Routes.PATH_AUTH}>
                <AuthScreen redirectPath={window.location.pathname} />
              </Route>
            </Switch>
          )}
        </Router>
      )
    }
}

RootNavigator.propTypes = {
  dispatch: PropTypes.any.isRequired,
  token: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(RootNavigator);
