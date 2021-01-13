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
            // based on their answer, either call the bid or the post functions
            switch (answer.EmployeeTracker) {
                case "Add a department":
                    addDepartment()
                    break;

                case "View department":
                    viewDepartment()
                    break;
                
                case "Update employee roles" :
                    updateRole()
                    break;
            }
        });
}

// function to handle posting new items up for auction
function addDepartment() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What department would you like to add?"
            },

        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO employeeTracker_DB.department SET ?",
                {
                    title: answer.department,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            );
        });
}

function viewDepartment() {
    connection.query (
        "SELECT * FROM employeeTracker_DB.department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            // re-prompt the user for if they want to bid or post
            start();
        }
    )
};

function updateRole() {
    connection.query (
        "SELECT * FROM employeeTracker_DB.employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
        }
    );
    connection.query (
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
            message: "What is the id of the employee you want to update?"
        }])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO employeeTracker_DB.department SET ?",
                {
                    title: answer.department,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            );
        });
}