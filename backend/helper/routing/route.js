import { Router } from "express";
import home from "../../controller/home.js";

const router = Router();
router.get("/", home.home);
router.get("/users", home.listitems);
router.get("/dataitem/:id", home.dataitems);
router.post("/login", home.loginuser);
router.post("/create", home.createuser);
router.put("/updateuser", home.updateuser);
router.delete("/user/:id", home.deleteuser);
router.delete("/delete/:id", home.deleteitem);
router.post("/updateitem/:id", home.updateitem);
router.post("/createitem", home.createitem);
export default router;
