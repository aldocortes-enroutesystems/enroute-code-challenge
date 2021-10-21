const express = require('express');
const controller = require('./../controllers');
const { body } = require('express-validator');
const router = new express.Router();

router.get('/employeesExample', controller.getEmployees);
router.get('/employee/:emp_no', controller.getEmployeeByNumber);
router.get('/employee/:emp_no/titles', controller.getTitles);
router.post('/employee/add', 
    body('birthDate').not().isEmpty().toDate(),
    body('firstName').not().isEmpty().trim().escape(),
    body('lastName').not().isEmpty().trim().escape(),
    body('gender').isIn(['M', 'F']),
    body('hireDate').not().isEmpty().toDate(),
    controller.addEmployee
);

module.exports = router;