const express = require("express");
const router = express.Router();
const path = require("path");

const data = {};

data.employees = require("../../model/employee.json");

const employeeController = require("../../controller/employeeController");

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.createNewEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.removeEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
