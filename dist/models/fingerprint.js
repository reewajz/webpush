"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userDetailSchema = new mongoose_1.Schema({
    browser: {
        type: String
    },
    os: {
        type: String
    },
    device: {
        type: String,
        required: true
    },
    deviceType: {
        type: String
    },
    deviceVendor: {
        type: String
    },
    cpu: {
        type: String
    }
});
const fingerprintSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true
    },
    subscribed_on: {
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
    }
}, {
    timestamps: true
});
const model = mongoose_1.default.model("Fingerprint", fingerprintSchema);
exports.schema = model.schema;
exports.default = model;
