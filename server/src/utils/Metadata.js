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