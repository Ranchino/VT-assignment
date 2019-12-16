"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
// Init express and set port
const app = express_1.default();
const port = 3000;
app.use('/api', body_parser_1.default.json());
app.use('/api', routes_1.default);
// Define our routes
app.use(express_1.default.static('./build/client'));
app.get('/', function (req, res, next) {
});
// Start server
app.listen(port, () => console.log('Server is running at port ' + port));
