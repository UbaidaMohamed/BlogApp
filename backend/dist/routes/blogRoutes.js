"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogControllers_1 = require("../controllers/blogControllers");
const router = express_1.default.Router();
router.post('/', blogControllers_1.createBlog);
router.get('/', blogControllers_1.getAllBlogs);
router.get('/:slug', blogControllers_1.getBlogBySlug);
router.put('/:id', blogControllers_1.updateBlog);
router.delete('/:id', blogControllers_1.deleteBlog);
exports.default = router;
