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

class Metadata {
    static generate(props) {
        return `||{{${this._params(props)}}}||`;
    }

    static isMetadata(text) {
        return text.match(/[||{{].*[}}||]/g);
    }

    static parse(metadata) {
        const payload = metadata.split('||{{')[1].split('}}||')[0];
        const values = payload.split("&");
        const json = {};
        values.forEach(value => json[value.split("=")[0]] = value.split("=")[1]);
    
        return json;
    }

    static _params(props) {
        return Object.keys(props).map(key => {
            return `${key}=${props[key]}`;
        }).join("&");
    }
}

module.exports = Metadata;