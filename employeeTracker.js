var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employeeTracker_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "EmployeeTracker",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add a department", "Add a role",
                "Add an employee", "View department",
                "View role", "View employees", "Update employee roles"]
        })
        .then(function (answer) {
            // Depending on the user's answer--add, view, or update something
            switch (answer.EmployeeTracker) {
                case "Add a department":
                    addDepartment()
                    break;

                case "View department":
                    viewDepartment()
                    break;

                case "Add a role":
                    addRole()
                    break;

                case "View role":
                    viewRole()
                    break;

                case "Update employee roles":
                    updateRole()
                    break;

                case "Add an employee":
                    addEmployee()
                    break;

                case "View employees":
                    viewEmployees()
                    break;
            }
        });
}

// function to handle adding a new department
function addDepartment() {
    // prompt for info about the department
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What department would you like to add?"
            },

        ])
        .then(function (answer) {
            // when finished prompting, insert a new department into the db with that info
            connection.query(
                "INSERT INTO employeeTracker_DB.department SET ?",
                {
                    title: answer.department,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created successfully!");

                    start();
                }
            );
        });
};

//function to view department table
function viewDepartment() {
    connection.query(
        "SELECT * FROM employeeTracker_DB.department",
        function (err, res) {
            if (err) throw err;
            console.table(res);

            start();
        }
    )
};




// function to handle adding a new employee
function addEmployee() {
    // prompt for info about the employee
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },

            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },

            {
                name: "roleId",
                type: "input",
                message: "What is the employee's role id?"
            },

            {
                name: "managerId",
                type: "input",
                message: "What is the employee's manager id?"
            },
        ])
        .then(function (answer) {
            console.table(answer)
            // when finished prompting, insert a new employee into the db with that info
            connection.query(
                "INSERT INTO employeeTracker_DB.employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId,
                    manager_id: answer.managerId

                },
                function (err) {
                    if (err) throw err;
                    console.log("The employee was added successfully!");

                    start();
                }
            );
        });
};

//function to view employee table
function viewEmployees() {
    connection.query(
        "SELECT * FROM employeeTracker_DB.employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);

            start();
        }
    )
};

//function to add a role
function addRole() {
    // prompt for info about the role
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "What role would you like to add?"
            },

        ])
        .then(function (answer) {
            // when finished prompting, insert a new role into the db with that info
            connection.query(
                "INSERT INTO employeeTracker_DB.role SET ?",
                {
                    title: answer.role,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your role was created successfully!");

                    start();
                }
            );
        });
};

//function that displays the role table
function viewRole() {
    connection.query(
        "SELECT * FROM employeeTracker_DB.role",
        function (err, res) {
            if (err) throw err;
            console.table(res);

            start();
        }
    )
};

//function to update employee role
function updateRole() {
    connection.query(
        "SELECT * FROM employeeTracker_DB.employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
        }
    );
    connection.query(
        "SELECT * FROM employeeTracker_DB.role",
        function (err, res) {
            if (err) throw err;
            console.table(res);
        }
    )

    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id of the employee you want to update?"
            },

        ])
        .then(function (answer) {
            connection.query(
                "SELECT * FROM employeeTracker_DB.role",
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                }
            )
            inquirer
                .prompt([
                    {
                        name: "role",
                        type: "input",
                        message: "What is the id of the new role?"
                    }
                ])

                .then(function (data) {

                    // when finished prompting, update the employee role with the new information
                    connection.query(
                        "UPDATE employeeTracker_DB.employee SET role_id = ? WHERE id = ?",
                        [data.role, answer.id]
                        ,
                        function (err) {
                            if (err) throw err;
                            console.log("The employee role was updated successfully!");

                            start();
                        }
                    );
                }
                )

        });
};

