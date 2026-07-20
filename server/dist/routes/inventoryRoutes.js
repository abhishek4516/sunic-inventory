"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventoryController_1 = require("../controllers/inventoryController");
const router = (0, express_1.Router)();
router.get("/", inventoryController_1.getItems);
router.post("/", inventoryController_1.addItem);
router.put("/:id", inventoryController_1.updateItem);
router.delete("/:id", inventoryController_1.deleteItem);
exports.default = router;
//# sourceMappingURL=inventoryRoutes.js.map