import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "FIXALL Tracking API funcionando!" });
});

export default router;
