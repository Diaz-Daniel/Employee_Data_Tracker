const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const openingQs = [
  {
    type: "list",
    name: "name",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
  },
];
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
const addDept = [
  {
    type: "text",
    name: "name",
    message: "Enter the name of the department:",
  },
];

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = [
  {
    type: "text",
    name: "name",
    message: "Enter the name of the role:",
  },
  {
    type: "text",
    name: "name",
    message: "Enter the salary:",
  },
  {
    type: "text",
    name: "name",
    message: "Enter the department for the role:",
  },
];
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmp = [
  {
    type: "text",
    name: "name",
    message: "Enter the first name of the employee:",
  },
  {
    type: "text",
    name: "name",
    message: "Enter the last name of the employee:",
  },
  {
    type: "text",
    name: "name",
    message: "Enter the role of the employee:",
  },
  {
    type: "text",
    name: "name",
    message:
      "Enter the name of the manager that will oversee the new employee:",
  },
];
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

function init() {
  inquirer.prompt(openingQs).then((answers) => {
    const response = JSON.stringify(answers);
    console.log(typeof response);
    console.log(response);

    //WHEN I choose to View all departments
    // THEN I am presented with a formatted table showing department names and department ids
    if (response === "name: View all departments ") {
      return console.log(response);
    } else {
      console.log("unsuccessful ");
    }
  });
}

init();

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: View all departments, View all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to View all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to View all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
