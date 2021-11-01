//import connection from connection.js
const connection = require("./connection");
//create a class that connects to connection

class DB {
  //inside the class we want a constructor that passes in
  constructor(connection) {
    this.connection = connection;
  }

  //this select statement needs to return the employee name first and last, the department name, thier role their salary and a manager name if they have one. you need to left join the role and department table as well as jleft join the managers table .

  //renaming colums using AS and using concat()to merge the names
  findAllEmployees() {
    // WHEN I choose to view all employees
    // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
      );
  }

  findAllRoles() {
    // WHEN I choose to view all roles
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS Department, role.salary from role LEFT JOIN department ON role.department_id=department.id;"
      );
  }
  findAllDepartments() {
    // WHEN I choose to view all departments
    // THEN I am presented with a formatted table showing department names and department ids
    return this.connection
      .promise()
      .query(
        "SELECT department.id, department.name AS Department FROM department;"
      );
  }
  addDepartment(addNewDpt) {
    console.log("hit the function!");

    // WHEN I choose to add a department
    // THEN I am prompted to enter the name of the department and that department is added to the database
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", addNewDpt);
  }
  addRole(newRole) {
    console.log("hit the function!");
    // WHEN I choose to add a role
    // THEN I am prompted to enter the title, salary, and department for the role and that role is added to the database
    return this.connection.promise().query("Insert into role SET ?", newRole);
  }
  addAnEmployee(employee) {
    console.log("hit the function!");
    // WHEN I choose to add an employee
    // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }
  updateEmployee(employeeId, roleId) {
    // WHEN I choose to update an employee role
    // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
    //update emoloyee set role_it to new id
    // console.log(roleUpdate);
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id=? WHERE id=?", [roleId, employeeId]);
  }
}

module.exports = new DB(connection);
