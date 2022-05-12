"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationStatus = void 0;
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus[ReservationStatus["Waiting"] = 0] = "Waiting";
    ReservationStatus[ReservationStatus["Pending"] = 1] = "Pending";
    ReservationStatus[ReservationStatus["Completed"] = 2] = "Completed";
    ReservationStatus[ReservationStatus["Canceled"] = 3] = "Canceled";
    ReservationStatus[ReservationStatus["None"] = 4] = "None";
})(ReservationStatus = exports.ReservationStatus || (exports.ReservationStatus = {}));
