import {
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
  // customreports
} from "./connectors";

const resolvers = {
  Query: {
    Device(_, args) {
      // console.log(device.find({ where: args }));
      return device.find({ where: args });
    },
    User(_, args) {
      return user.find({ where: args });
    },

    Hub(_, args) {
      return hub.getAll({ where: args });
    },

    SmartGroupList() {
      return smartgroup.getList();
    },

    IntelligenceReports() {
      return reports.getList();
    },

    Okta() {
      return okta.getList();
    },
    // CustomReports(_, args) {
    //   return user.find({ where: args });
    // },
    // locationgroup(_, args) {
    //   return locationgroup.find({ where: args });
    // },
    AllUsers() {
      return user.findAll({ limit: 10 });
    },
    fortunecookieapi() {
      return FortuneCookie.getOne();
    }
    // deviceprofiledevicepool(_, args) {
    //   return deviceprofiledevicepool.findAll({ where: args });
    // }
  },

  Device: {
    Locationgroup(device) {
      return device.getLocationgroup();
    },
    Deviceprofile(device) {
      return device.getDeviceprofiledevicepools();
    },

    Apps(device) {
      return app.getAppNames(device.DeviceID);
    }
  },

  User: {
    Locationgroup(user) {
      return user.getLocationgroup();
    },

    Devices(user) {
      return user.getCdeus();
    },

    Okta(user) {
      // okta.getAll(user.EmailAddress).then(res => {
      //   console.log(res);
      //   return res;
      // });

      return okta.getAll(user.EmailAddress);
      // var t = okta.getUser(user.EmailAddress);
      // return t.then(res1 => {
      //   okta.getApps(res1.id).then(res2 => {
      //     res1["appsinokta"] = res2;
      //     // return (res1["appsinokta"] = res2);
      //   });
      //   console.log(res1);
      //   return res1;
      // });
    }
  }
};

export default resolvers;

// DeviceProfileDevicePool(device) {
//       return device.getDeviceProfileDevicePool();
//     }
