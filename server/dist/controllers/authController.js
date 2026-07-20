"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await user_1.default.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        const token = (0, generateToken_1.default)(user._id.toString(), user.role);
        return res.status(201).json({
            success: true,
            token,
            user,
        });
    }
    catch {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const token = (0, generateToken_1.default)(user._id.toString(), user.role);
        return res.status(200).json({
            success: true,
            token,
            user,
        });
    }
    catch {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map