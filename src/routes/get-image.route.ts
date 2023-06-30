import express from "express";
import ImageController from "../app/controllers/ImageController";
const router = express.Router();
router.use("/api/image", ImageController.fullImage);
router.use("/", ImageController.home);
router.use("*", ImageController.pageNotFound);

export default router;
