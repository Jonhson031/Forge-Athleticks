import expres from "express";
import {
  newProduct,
  getAllProducts,
  getFilteredProducts,
  getProduct,
} from "../controllers/productsController.js";

const router = expres.Router();

router.route("/").post(newProduct).get(getAllProducts);
router.route("/filter").get(getFilteredProducts);
router.route("/:id").get(getProduct);

export default router;
