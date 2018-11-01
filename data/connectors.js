import Sequelize from "sequelize";
import casual from "casual";
import _ from "lodash";
import fetch from "node-fetch";

var config = require("./secrets");

const db = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    dialect: "mssql",
    host: config.db.server,
    port: config.db.port // Default port
  }
);

const DeviceModel = db.define(
  "device",
  {
    DeviceID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    Name: { type: Sequelize.STRING },
    OEMInfo: { type: Sequelize.STRING },
    OSplatformString: { type: Sequelize.STRING },
    OSMajorVersion: { type: Sequelize.STRING },
    OSMinorVersion: { type: Sequelize.STRING },
    SerialNUmber: { type: Sequelize.STRING },
    ComplianceStatusID: { type: Sequelize.STRING }
  },
  {
    timestamps: false,

    tableName: "[Device]"
  }
);

const UserModel = db.define(
  "user",
  {
    EnrollmentUserID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    FirstName: { type: Sequelize.STRING },
    UserName: { type: Sequelize.STRING },
    LocationGroupID: { type: Sequelize.STRING },
    EmailAddress: { type: Sequelize.STRING },
    EnrollmentUserDN: { type: Sequelize.STRING },
    LocationGroupID: { type: Sequelize.INTEGER },
    LastName: { type: Sequelize.STRING }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "EnrollmentUser",
    schema: "mobilemanagement"
  }
);

const DeviceUserModel = db.define(
  "cdeu",
  {
    DeviceID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    EnrollmentUserID: { type: Sequelize.INTEGER }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "CurrentDeviceEnrollmentUser",
    schema: "mobilemanagement"
  }
);

const LocationGroupModel = db.define(
  "locationgroup",
  {
    LocationGroupID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    Name: { type: Sequelize.STRING }
  },

  {
    timestamps: false,
    freezeTableName: true,
    tableName: "locationgroup",
    schema: "dbo"
  }
);

const DeviceProfileDevicePoolModel = db.define(
  "deviceprofiledevicepool",
  {
    DeviceID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },

    UniqueKey: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    ReportedName: { type: Sequelize.STRING },
    ReportedDescription: { type: Sequelize.STRING }
  },

  {
    timestamps: false,
    freezeTableName: true,
    tableName: "DeviceProfileDevicePool",
    schema: "deviceprofile"
  }
);

const FortuneCookie = {
  getOne() {
    fetch(config.intelliapi.url + "/api/v1/reports/search", {
      method: "Post",

      body: JSON.stringify({
        offset: 0,
        page_size: 25
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + config.intelliapi.access_token
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.data.results);
      });

    console.log("BC");
    return fetch("http://fortunecookieapi.herokuapp.com/v1/cookie")
      .then(res => res.json())
      .then(res => {
        return res[0].fortune.message;
      });
  }
};

const reports = {
  getList() {
    return fetch(config.intelliapi.url + "/api/v1/reports/search", {
      method: "Post",

      body: JSON.stringify({
        offset: 0,
        page_size: 25
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + config.intelliapi.access_token
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.data.results);
        return res.data.results;
      });
  }
};

const okta = {
  getList() {
    return fetch(config.okta.url + "/v1/apps", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "SSWS " + config.okta.token
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      });
  },

  getAll(email) {
    return fetch(config.okta.url + "/v1/users/" + email, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "SSWS " + config.okta.token
      }
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        return fetch(config.okta.url + "/v1/users/" + res.id + "/appLinks", {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: "SSWS " + config.okta.token
          }
        })
          .then(res1 => res1.json())
          .then(res1 => {
            res["appsinokta"] = res1;
            // console.log(res);
            return res;
          });
      });
  },

  getUser(email) {
    return fetch(config.okta.url + "/v1/users/" + email, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "SSWS " + config.okta.token
      }
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        return res;
      });
  },

  getApps(id) {
    return fetch(config.okta.url + "/v1/users/" + id + "/appLinks", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "SSWS " + config.okta.token
      }
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        return res;
      });
  }
};
const api = {
  getOne(id) {
    fetch(config.intelliapi.url + "/api/v1/reports/search", {
      method: "Post",
      authorization: config.intelliapi.access_token,
      body: JSON.stringify({
        offset: 0,
        page_size: 25
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
    console.log(id);
    return fetch("http://fortunecookieapi.herokuapp.com/v1/cookie")
      .then(res => res.json())
      .then(res => {
        console.log(res[0].fortune.message);
        return res[0].fortune.message;
      });
  }
};

const app = {
  getAppNames(id) {
    return db
      .query(
        "SELECT Name,Version FROM interrogator.Application (NOLOCK) ia JOIN interrogator.ApplicationList (NOLOCK) ial ON ia.ApplicationID = ial.ApplicationID WHERE ial.DeviceID = :deviceID;",
        { replacements: { deviceID: id } }
      )
      .then(result => {
        return result[0];
      });
  }
};

const hub = {
  getAll(id) {
    return db
      .query(
        "SELECT dt.Name 'DeviceType', COUNT(*) AS 'DeviceCount', (SELECT COUNT(*) FROM dbo.Device (NOLOCK)) 'TotalCount', 1.0 * 100 * COUNT(*)/(SELECT COUNT(*) FROM dbo.Device (NOLOCK))  'Prcntg' FROM dbo.Device d (NOLOCK) LEFT OUTER JOIN dbo.DeviceType dt (NOLOCK) ON dt.DeviceTypeID = d.DeviceType GROUP BY dt.Name ORDER BY 'Prcntg' DESC, dt.Name;",
        { replacements: { deviceID: id } }
      )
      .then(result => {
        console.log(result[0][0]);
        return result[0];
      });
  }
};

const smartgroup = {
  getList() {
    return fetch(config.awapi.url + "/mdm/smartgroups/search", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: config.awapi.Auth,
        "aw-tenant-code": config.awapi.awtenantcode
      }
    })
      .then(res => res.json())
      .then(res => {
        return res.SmartGroups;
      });
  }
};

DeviceModel.belongsTo(LocationGroupModel, { foreignKey: "LocationGroupID" });
UserModel.belongsTo(LocationGroupModel, { foreignKey: "LocationGroupID" });
DeviceProfileDevicePoolModel.belongsTo(DeviceModel, { foreignKey: "DeviceID" });
DeviceModel.hasMany(DeviceProfileDevicePoolModel, { foreignKey: "DeviceID" });
DeviceModel.belongsTo(DeviceProfileDevicePoolModel, { foreignKey: "DeviceID" });
UserModel.hasMany(DeviceUserModel, { foreignKey: "EnrollmentUserID" });

const device = db.models.device;
const user = db.models.user;
const locationgroup = db.models.locationgroup;
const deviceprofiledevicepool = db.models.deviceprofiledevicepool;
const cdeu = db.models.cdeu;
export {
  device,
  user,
  locationgroup,
  deviceprofiledevicepool,
  FortuneCookie,
  api,
  app,
  hub,
  smartgroup,
  reports,
  cdeu,
  okta
};
