"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticationToken_1 = require("../authenticationToken");
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
router.get('/', authenticationToken_1.authentication);
router.get('/', (req, res) => {
    res.status(200).json({ message: "success" });
});
module.exports = router;
