import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "get route" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "post route" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "get route", id: req.params.id });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "put route", id: req.params.id });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "delete route", id: req.params.id });
});

export { router as default };
