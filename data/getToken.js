var config = require("./secrets");
import fetch from "node-fetch";
var fs = require("fs");
var fileName = "./secrets.json";

const headers_refresh = {
  "Content-Type": "application/json",
  "aw-tenant-code": config.awapi.awtenantcode,
  "cache-control": "no-cache",
  Authorization: config.awapi.Auth
};

const headers_access = {
  "Content-Type": "application/json"
};

const getAccess = {
  getAccessTok() {
    fetch(config.awapi.url + "/system/customreports/refreshtoken", {
      method: "Get",
      headers: headers_refresh
    })
      .then(res => res.json())
      .then(res => {
        console.log(config.intelliapi.url);
        fetch(config.intelliapi.url + "/auth/console/token", {
          method: "Post",
          headers: headers_access,
          body: JSON.stringify({ refresh_token: res.refreshToken })
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            fs.writeFileSync(
              "./data/access.json",
              JSON.stringify({ token: res.access_token })
            );
          });
      });
  }
};

export default getAccess;
