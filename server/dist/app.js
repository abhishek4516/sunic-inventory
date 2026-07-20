"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const issue_routes_1 = __importDefault(require("./routes/issue.routes"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/issues", issue_routes_1.default);
app.use("/api/employees", employee_routes_1.default);
app.get("/", (req, res) => {
    res.send("Sunic Inventory API");
});
exports.default = app;
//# sourceMappingURL=app.js.map