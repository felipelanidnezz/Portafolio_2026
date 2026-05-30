import { Router } from "express";
import { main, main2, historial, eliminar, status } from "../controllers/chatcontroller.js";

const router = Router();

router.get("/status", status);
router.get("/main", main);
router.get("/main2", main2);
router.get("/historial", historial);
router.delete("/eliminar", eliminar);

export default router;
