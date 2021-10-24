const inquirer = require("inquirer");
const fs = require("fs");

inquirer
  .prompt([
    {
      type: "list",
      name: "name",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
      ],
    },
  ])
  .then((answers) => {
    console.log(answers);
  });
