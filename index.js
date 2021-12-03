const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const members = [];

const addEmployee = () => {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Which team member would you like to add?",
      choices: ["Intern", "Engineer", "Manager", "Nada"],
    },
  ]).then(({ choice }) => {
    switch (choice) {
      case "Intern":
        createIntern();
        break;
      case "Engineer":
        createEngineer();
        break;
      case "Manager":
        createManager();
        break;
      default:
        printEmployeePage();
        break;
    }
  });
};

addEmployee();

const createIntern = () => {
  prompt([
    {
      type: "input",
      name: "name",
      message: "What is the Intern's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the Intern's id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the Intern's email?",
    },
    {
      type: "input",
      name: "school",
      message: "What is the Intern's school?",
    },
  ]).then(({ name, id, email, school }) => {
    // create new Intern
    const newIntern = new Intern(name, id, email, school);
    // push new Intern into members Array
    members.push(newIntern);
    // ask the questions again
    addEmployee();
  });
};

const createEngineer = () => {
  prompt([
    {
      type: "input",
      name: "name",
      message: "What is the Engineer's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the Engineer's id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the Engineer's email?",
    },
    {
      type: "input",
      name: "github",
      message: "What is the Engineer's github?",
    },
  ]).then(({ name, id, email, github }) => {
    // create new Engineer
    const newEngineer = new Engineer(name, id, email, github);
    // push new Engineer into members Array
    members.push(newEngineer);
    // ask the questions again
    addEmployee();
  });
};

const createManager = () => {
  prompt([
    {
      type: "input",
      name: "name",
      message: "What is the Manager's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the Manager's id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the Manager's email?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the Manager's officeNumber?",
    },
  ]).then(({ name, id, email, officeNumber }) => {
    // create new Manager
    const newManager = new Manager(name, id, email, officeNumber);
    // push new Manager into members Array
    members.push(newManager);
    // ask the questions again
    addEmployee();
  });
};

const printEmployeePage = () => {
  let cards = "";
  members.forEach((member) => {
    switch (member.getRole()) {
      case "Engineer":
        cards += `
                <div class="card text-center" style="width: 18rem;">
                    <div class="card-body">
                        <div class="card-header">${member.getRole()}</div>
                        <h5 class="card-header">${member.getName()}</h5>
                        <p class="card-text">ID:${member.getId()}</p>
                        <a class="card-text" href="https://github.com/${member.get}">Github:${member.getGithub()}</a>
                        <a class ="card-link" href="mailto:${member.getEmail()}">Email:${member.getEmail()}</a>
                    </div>
                </div>
                `;
        break;
      case "Manager":
        cards += `
                <div class="card text-center"> style="width: 18rem;">
                    <div class="card-body">
                        <div class="card-header">${member.getRole()}</div>
                        <h5 class="card-header">${member.getName()}</h5>
                        <p class="card-text">ID:${member.getId()}</p>
                        <p class="card-text">Office Number:${member.getOfficeNumber()}</p>
                        <a class ="card-link" href="mailto:${member.getEmail()}">Email:${member.getEmail()}</a>
                    </div>
                </div>
                `;
        break;
      case "Intern":
        cards += `
                <div class="card text-center" style="width: 18rem;">
                    <div class="card-body">
                        <div class="card-header">${member.getRole()}</div>
                        <h5 class="card-header">${member.getName()}</h5>
                        <p class="card-text">ID:${member.getId()}</p>
                        <p class="card-text">School:${member.getSchool()}</p>
                        <a class ="card-link" href="mailto:${member.getEmail()}">Email:${member.getEmail()}</a>
                    </div>
                </div>
                `;
        break;

      default:
        break;
    }
  });

  const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <title>Document</title>
            <link rel="stylesheet" href="../style.css">
        </head>
        <body>
            <h1>My Team</h1>
            ${cards}
        </body>
        </html>
    `;

  fs.writeFile(
    path.join(__dirname, "/output/member.html"),
    template,
    "utf8",
    () => {
      console.log("success!!!!!");
    }
  );
};
