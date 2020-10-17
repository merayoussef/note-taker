const fs = require('fs');
const path = require('path');

function createNewTask(body, db) {
    const newTask = body;
    db.push(newTask);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({ newTask }, null, 2)
    );
    return newTask;
}

module.exports = {
    createNewTask
}