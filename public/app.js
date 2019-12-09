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
// Init express and set port
const app = express_1.default();
const port = 3000;
app.use('/api', BodyParser.json());
// Define our routes
app.use(express_1.default.static('public'));
app.get('/api/?', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send({ response: "It works!" });
});
/* app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/static/web/index.html'));
  }); */
// Start server
app.listen(port, () => console.log('Server is running at port ' + port));