import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
// import mocks from './mocks';
import resolvers from "./resolvers";
// device(DeviceId: Int, Name: String, OEMInfo: String,LocationGroupID:Int): device
const typeDefs = `
 # Explore data provided through the WS1 UEM
type Query {
   #Get info on devices
  Device( DeviceID:Int, Name: String, OEMInfo: String,LocationGroupID:Int): Device
   # Explore Data starting at a user
  User(EnrollmentuserID: Int, UserName: String, FirstName: String): User
   # Get a list of all users
   AllUsers : [User]
  fortunecookieapi :String @cacheControl(maxAge: 240)
  Hub (DeviceType:String,DeviceCount:String,TotalCount:String,Prcntg:String) : [hub]
  SmartGroupList: [smartgroups]
  IntelligenceReports : [reports]
  Okta : [oktaapps]
}
type Device {
  DeviceID: Int
  Name: String
  OEMInfo: String
  OSplatformString: String
  OSMajorVersion:String
  OSMinorVersion:String
  SerialNUmber: String
  ComplianceStatusID: String
  Locationgroup:locationgroup
  LocationGroupID :String
  Deviceprofile:[deviceprofiledevicepool]

  Apps: [apps]
}

 # Info on the user
type User {
  EnrollmentUserID: Int
   # The user's username, should be typed in the login field.
  UserName: String
  FirstName: String
  Locationgroup:locationgroup
  LocationGroupID :Int
  EmailAddress: String
  LastName: String
  EnrollmentUserDN: String
  Devices: [Device]
  Okta: oktauser
}

type locationgroup {
  LocationGroupID:Int,
   Name:String
   Devices: [Device]

}
type apps {
   Name:String
   Version: String
}

type deviceprofiledevicepool {
  ReportedName:String
    ReportedDescription: String
}

type hub {
  DeviceType:String
  DeviceCount:String
  TotalCount:String
  Prcntg:String
}

type smartgroups {
  Name:String
  ManagedByOrganizationGroupName:String
  Devices:Int

}

type reports {
  name:String
  description:String
  category_name:String
  column_names:[String]

}

type devil {
  DeviceID:Int

}

type oktaapps {
  id: String
  name: String
  label: String
  status: String
  created: String
}

type oktauser {

  id: String
  status :String
  lastLogin : String
  appsinokta : [appsinokta]
}

type appsinokta {
  label :String
  appName: String
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
