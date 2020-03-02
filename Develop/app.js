const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employees = [];
const questManager = [
    {
        type: "input",
        message: "Enter Manager Name",
        name: "name"
    },
    {
        type: "input",
        message: "Enter Manager Id",
        name: "id"
    },
    {
        type: "input",
        message: "Enter Manager Email",
        name: "email"
    },
    {
        type: "input",
        message: "Enter Manager Office Number",
        name: "office"
    },
];

const employeeType = [
    {
        type: "list",
        message: "What Type of Employee?",
        choices: ["Engineer", "Intern"],
        name: "type"
    }
];

const questEngineer = [
    {
        type: "input",
        message: "Enter Engineer Name",
        name: "name"
    },
    {
        type: "input",
        message: "Enter Engineer Id",
        name: "id"
    },
    {
        type: "input",
        message: "Enter Engineer Email",
        name: "email"
    },
    {
        type: "input",
        message: "Enter Engineer Github Username",
        name: "github"
    },
];

const questIntern = [
    {
        type: "input",
        message: "Enter Intern Name",
        name: "name"
    },
    {
        type: "input",
        message: "Enter Intern Id",
        name: "id"
    },
    {
        type: "input",
        message: "Enter Intern Email",
        name: "email"
    },
    {
        type: "input",
        message: "Enter Intern School",
        name: "school"
    },
];

const newEmployee = [
    {
        type: "list",
        message: "Add a New Employee?",
        choices: ["Yes", "No"],
        name: "new"
    }
];



function addEmployee() {
    inquirer.prompt(employeeType).then(answer => {
        if (answer.type === "Engineer") {
            inquirer.prompt(questEngineer).then(answer => {
                console.log(`${answer.name} The Engineer Stored!`);
                const newEngineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
                employees.push(newEngineer);
                inquirer.prompt(newEmployee).then(answer => {
                    if (answer.new === "Yes") {
                        addEmployee();
                    } else {
                        fs.writeFileSync(outputPath, render(employees), "utf-8");
                        console.log("team.html Created!");
                    }
                })
            })
        }else {
            inquirer.prompt(questIntern).then(answer => {
                console.log(`${answer.name} The Intern Stored!`);
                const newIntern = new Intern(answer.name, answer.id, answer.email, answer.school);
                employees.push(newIntern);
                inquirer.prompt(newEmployee).then(answer => {
                    if (answer.new === "Yes") {
                        addEmployee();
                    } else {
                        fs.writeFileSync(outputPath, render(employees), "utf-8");
                        console.log("team.html Created!");
                    }
                })
            })
        }
    });
}

function renderHtml() {
    inquirer.prompt(questManager).then(answer => {
        const newManager = new Manager(answer.name, answer.id, answer.email, answer.office);
        employees.push(newManager);
        console.log(`${answer.name} The Manager Stored!`);
        inquirer.prompt(newEmployee).then(answer => {
            if (answer.new === "Yes") {
                addEmployee();
            }else {
                fs.writeFileSync(outputPath, render(employees), "utf-8");
                console.log("team.html Created!");
            }
        })
    })
}

renderHtml();
