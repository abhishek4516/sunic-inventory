"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.me = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// import { AuthRequest } from "../middleware/authenticate";
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({
            email: email.toLowerCase(),
        }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Account is inactive. Contact administrator.",
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const token = (0, generateToken_1.default)(user._id.toString(), user.role);
        return res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                employeeId: user.employeeId,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isActive: user.isActive,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.login = login;
const me = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                employeeId: user.employeeId,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isActive: user.isActive,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.me = me;
const logout = async (_req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map