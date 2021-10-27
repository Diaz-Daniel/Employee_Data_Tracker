const inquirer = require("inquirer");
const {} = require("./db");
const db = require("./db");
require("console.table");
//connect seeds sql
//connect routes folder

const openingQs = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit",
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
  inquirer.prompt(openingQs).then((res) => {
    //console.log(res.options);
    switch (res.options) {
      case "View all employees":
        viewEmployees();
        break;
      case "View all departments":
        viewDepartments();
        break;
      case "View all roles":
        viewRole();
        break;
      case "Add an employee":
        addEmployee();
        break;

      default:
        process.exit();
    }
  });
}

function viewEmployees() {
  db.findAllEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => {
      init();
    });
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([data]) => console.table(data))
    .then(() => init());
}

function viewRole() {
  db.findAllRoles()
    .then(([data]) => console.table(data))
    .then(() => init());
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the employee?",
      },
    ])
    .then((res) => {
      let firstName = res.first_name;
      let lastName = res.last_name;
      // console.log(firstName);

      db.findAllRoles().then(([data]) => {
        const roleChoices = data.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        // var roleId;
        inquirer
          .prompt([
            {
              type: "list",
              name: "roleId",
              message: "what is the employee's role?",
              choices: roleChoices,
            },
          ])
          .then((res) => {
            let newEmpRoleId = res.roleId;
            console.log(newEmpRoleId);

            //             //grab a list of all the employee's  then map the options as choices for manager. make sure the map fuction returns an object that concats the employee name as name, and passes the id as the value. then prompt the user to add the employee manager name. look into unshift function for ability to add a none value. Once that option is chosen create a object that passes the employee information to the addEmployee() then run the init function again
          });
      });
    });
}

init();

// const employee = {
//   first_name: "Dan",
//   last_name: "Dia",
//   role_id: 1,
// };

// db.addAnEmployee(employee);
