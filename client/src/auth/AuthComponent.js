import React from 'react';
import { Button } from "antd";

class AuthComponent extends React.PureComponent {

  render() {

    return (
      <div>
        <h1 style={{ textAlign: "center", margin: '5%' }}>Please login</h1>
        <center>
          <Button type="primary" href={`https://discord.com/api/oauth2/authorize?client_id=712727381177270283&redirect_uri=${window.location.origin}%2Foauth-redirect&response_type=token&scope=identify%20guilds`}>Login</Button>
        </center>
      </div>
    );
  }
}

AuthComponent.propTypes = {
};

export default AuthComponent;
