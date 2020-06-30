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
