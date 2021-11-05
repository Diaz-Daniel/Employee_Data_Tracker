const inquirer = require("inquirer");
const { updateEmployee } = require("./db");
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
      case "Add a role":
        addRole();
        break;
      case "Add a department":
        addNewDepartment();
        break;
      case "Update an employee role":
        updateEmpRole();
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
      console.log(firstName);
      console.log(lastName);

      db.findAllRoles().then(([data]) => {
        const roleChoices = data.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

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

            db.findAllEmployees().then(([data]) => {
              console.log(data);
              const newEmpManager = data.map(
                ({ id, first_name, last_name }) => ({
                  name: first_name.concat(" ", last_name),
                  value: id,
                })
              );
              console.log(newEmpManager);
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "mgrChoice",
                    message: "Who is the employees manager?",
                    choices: newEmpManager,
                  },
                ])
                .then((res) => {
                  let empManager = res.mgrChoice;
                  console.log(empManager);
                  const employee = {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: newEmpRoleId,
                    manager_id: empManager,
                  };

                  db.addAnEmployee(employee);
                })
                .then(() => init());
            });
          });
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "text",
        name: "role",
        message: "What is the name of the new role?",
      },
      {
        type: "text",
        name: "amount",
        message: "What is the salary?",
      },
    ])
    .then((res) => {
      let roleName = res.role;
      let newSalary = res.amount;
      console.log(roleName);
      console.log(newSalary);

      db.findAllDepartments().then(([data]) => {
        const dept = data.map(({ id, Department }) => ({
          name: Department,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "departmentName",
              message: "What department will the role be in?",
              choices: dept,
            },
          ])
          .then((res) => {
            let deptAddRole = res.departmentName;
            console.log(deptAddRole);
            const newRole = {
              title: roleName,
              salary: newSalary,
              department_id: deptAddRole,
            };

            db.addRole(newRole);
          })

          .then(() => init());
      });
    });
}

function addNewDepartment() {
  inquirer
    .prompt([
      {
        type: "text",
        name: "newdept",
        message: "what is the name of the new department?",
      },
    ])
    .then((res) => {
      let addDept = res.newdept;
      console.log(addDept);
      let addNewDpt = {
        name: addDept,
      };

      db.addDepartment(addNewDpt);
    })
    .then(() => init());
}

function updateEmpRole() {
  db.findAllEmployees().then(([data]) => {
    const empName = data.map(({ id, first_name, last_name }) => ({
      name: first_name.concat(" ", last_name),
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "updtRole",
          message: "Update the role of which employee?",
          choices: empName,
        },
      ])
      .then((res) => {
        let er = res.updtRole;
        console.log(er);

        db.findAllRoles().then(([data]) => {
          const empRole = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "updtRole",
                message: "What is the employee's new role?",
                choices: empRole,
              },
            ])
            .then((res) => {
              let newEmployeeRole = res.updtRole;
              console.log(newEmployeeRole);

              db.updateEmployee(er, newEmployeeRole);
            })
            .then(() => init());
        });
      });
  });
}

init();
