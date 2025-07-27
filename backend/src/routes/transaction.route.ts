import { Router } from "express";
import {
  createTransactionController,
  deleteTransactionController,
  duplicateTransactionController,
  getAllTransactionController,
  getTransactionByIdController,
  updateTransactionController,
} from "../controllers/transaction.controller";

const transactionRoutes = Router();

transactionRoutes.post("/create", createTransactionController);
transactionRoutes.put("/duplicate/:id", duplicateTransactionController);

transactionRoutes.put("/update/:id", updateTransactionController);

transactionRoutes.delete("/delete/:id", deleteTransactionController);

transactionRoutes.get("/all", getAllTransactionController);
transactionRoutes.get("/:id", getTransactionByIdController);

export default transactionRoutes;
