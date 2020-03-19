import mongoose, { Schema } from "mongoose";

const userDetailSchema = new Schema({
  browser:{
    type:String
  },
  os:{
      type: String
  },
  device:{
    type:String,
  },
  deviceType:{
      type: String
  },
  deviceVendor: {
      type: String
  },
  cpu: {
    type: String
} 

})
const fingerprintSchema = new Schema(
  {
    token:{
      type:String,
      required:true
    },
    subscribed_on:{
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Number
    },
    fingerprint: {
      type: String
    },
    details: {
        type: userDetailSchema
    },
    organizationID:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

const model = mongoose.model("Fingerprint", fingerprintSchema);

export const schema = model.schema;
export default model;
