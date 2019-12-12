"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
// Init express and set port
const app = express_1.default();
const port = 3000;
app.use('/api', BodyParser.json());
app.get('/api', (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});
app.use('/api', routes_1.default);
// Define our routes
app.use(express_1.default.static('./build/client'));
app.get('/', function (req, res, next) {
});
// Start server
app.listen(port, () => console.log('Server is running at port ' + port));
