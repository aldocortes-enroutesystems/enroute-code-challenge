const { validationResult } = require('express-validator');
const { database, applyQuery } = require('./../../config/database');
const { dateParser, getRandomRange } = require('./../lib/utils');

const getEmployees = async (req, res) => {
    try {
        const limit = 100; // Page size
        const counter = await getTotalEmployees();
        let page = req.query.page || 1;
        if(page < 1 || isNaN(page)){
            return res.status(404).send('Not found');
        }
        const offset = (page-1) * limit;
        const sqlQuery = `SELECT * FROM employees WHERE hire_date BETWEEN '1990-01-01' AND '1990-01-15' ORDER BY last_name ASC LIMIT ${limit} OFFSET ${offset};`;
        const records = await applyQuery(sqlQuery);
        return res.json({
            dataset: records,
            total: counter[0].total
        });
    } catch(e) {
        console.log('Error on getEmployees', e);
        res.status(500).send(`we can't process your request right now. Try later.`);
    }
};

const getTotalEmployees = () => {
    return applyQuery(`SELECT count(*) as total from employees WHERE hire_date BETWEEN '1990-01-01' AND '1990-01-15';`);
};

const getEmployeeByNumber = async(req, res) => {
    try {
        const emp = req.params.emp_no;
        if(isNaN(emp)) {
            return res.status(404).send('Not found');
        }
        const record = await applyQuery(`
        SELECT e.*, s.salary, (SELECT dept_name FROM departments WHERE dept_no = dm.dept_no) as dept_manager, (SELECT dept_name FROM departments WHERE dept_no = de.dept_no) as dept_emp
        FROM employees e 
            LEFT JOIN salaries s ON e.emp_no = s.emp_no
            LEFT JOIN dept_manager dm ON dm.emp_no = e.emp_no
            LEFT JOIN dept_emp de ON de.emp_no = e.emp_no
        WHERE e.emp_no = '${emp}' AND s.to_date >= NOW();`);
        return res.json(record[0]);
    } catch(e) {
        console.log('Error on getEmployees', e);
        res.status(500).send(`we can't process your request right now. Try later.`);
    }
};

const addEmployee = async(req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).send(errors.array());
    } 
    try {
        const uuid = await getUUID();
        const employee = {
            emp_no: uuid,
            birth_date: dateParser(req.body.birthDate),
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            gender: req.body.gender,
            hire_date: dateParser(req.body.hireDate)
        };

        const sqlQuery = 'INSERT INTO employees SET ?';
        database.query(sqlQuery, employee, (err, row) => {
            if (err) throw err;
            res.send({dataset: 'success'});
        });
    } catch(e) {
        console.log('Error on getEmployees', e);
        res.status(500).send(`we can't process your request right now. Try later.`);
    }
};

const getUUID = async() => {
    try {
        let limit = 0;
        while(limit < 100) {
            const selectedID = getRandomRange(1, 2147483647); // Storage max raange supported by MySQL
            const search = await applyQuery(`SELECT emp_no FROM employees WHERE emp_no=${selectedID};`);
            if(search.length == 0) { 
                limit = 100;
                return selectedID;
            }
            limit++;
        }
    } catch(e) {
        throw e;
    }
};


const getTitles = async(req, res) => {
    try {
        const emp = req.params.emp_no;
        if(isNaN(emp)) {
            return res.status(404).send('Not found');
        }
        const records = await applyQuery(`SELECT * FROM titles WHERE emp_no = '${emp}' ORDER BY from_date ASC;`);
        return res.json({
            dataset: records
        });
    } catch(e) {
        console.log('Error on getEmployees', e);
        res.status(500).send(`we can't process your request right now. Try later.`);
    }
};

module.exports = {
    getEmployees,
    getEmployeeByNumber,
    getTitles,
    addEmployee
}