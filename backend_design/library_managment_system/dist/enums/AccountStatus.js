"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStatus = void 0;
var AccountStatus;
(function (AccountStatus) {
    AccountStatus[AccountStatus["Active"] = 0] = "Active";
    AccountStatus[AccountStatus["Closed"] = 1] = "Closed";
    AccountStatus[AccountStatus["Canceled"] = 2] = "Canceled";
    AccountStatus[AccountStatus["Blacklisted"] = 3] = "Blacklisted";
    AccountStatus[AccountStatus["None"] = 4] = "None";
})(AccountStatus = exports.AccountStatus || (exports.AccountStatus = {}));
