const { Graph } = require("./Graph")
const fs = require("fs")
let data, line, g, numPeople, enemy
let arr = []
if (process.argv.length != 3){
    console.log("Please input 3 arguments!\nEx: node FILENAME INPUTFILE")
    process.kill(0)
}
try{
    data = fs.readFileSync(process.argv[2], "utf-8")
}
catch (err){
    console.error(err)
    process.kill(0)
}
console.log("INPUT DATA:\n" + data)
line = data.split('\n')
numPeople = line.length
for (let i = 0; i < numPeople; i++) {
    arr.push(line[i].split(" "))
}
g = new Graph()
// Create vertices for people
for (let i = 0; i < numPeople; i++) {
    g.addVertex(i)
}
// Add edges
for (let i = 0; i < numPeople; i++) {
    // Only check top half (can check bottom if preferred)
    for (let j = i + 1; j < numPeople; j++) {
        if (arr[i][j] === "0") {
            g.addEdge(i, j)
        }
    }
}
// Check Effectiveness Possible
let g1 = [], g2 = []
for (let i = 0; i < numPeople; i++) {
    enemy = g.checkAdj(i)
    if (!enemy.some(x => g1.indexOf(x)>-1)){g1.push(i)}
    else if (!enemy.some(x => g2.indexOf(x)>-1)){g2.push(i)}
    else{
        console.log("Seperation not possible")
        process.kill(0)
    }
}
console.log("Group 1: " + g1 + "\nGroup 2: " + g2)