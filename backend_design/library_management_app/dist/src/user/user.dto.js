"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsEmail)()
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: "Password is too short" }),
    (0, class_validator_1.MaxLength)(15, { message: "Password is too long" })
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], CreateUserDto.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], CreateUserDto.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsDateString)()
], CreateUserDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(12),
    (0, class_validator_1.Max)(110)
], CreateUserDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsPhoneNumber)("US")
], CreateUserDto.prototype, "phone", void 0);
exports.default = CreateUserDto;
