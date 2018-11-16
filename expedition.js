const { Graph } = require("./Graph")    // Import graph struct
const fs = require("fs")                // import file system from node to read file
let data, line, g, numPeople, enemy     // Create undefined variables to use later
let arr = []                            // Empty array to store nums from in file
if (process.argv.length != 3){          // Error checking if proper args used
    console.log("Please input 3 arguments!\nEx: node FILENAME INPUTFILE") 
    process.kill(0)                     // Kill program if user did not put in correct args
}
try{
    data = fs.readFileSync(process.argv[2], "utf-8")    // Read file using node file sync
}
catch (err){                                            // Kill program if file error
    console.error(err)
    process.kill(0)
}
console.log("INPUT DATA:\n" + data)     // Print input data so user can see
line = data.split('\n')                 // Split lines of input into array of lines
numPeople = line.length                 // Number of people = number of lines (OR columns)
for (let i = 0; i < numPeople; i++) {   
    arr.push(line[i].split(" "))        // Split each line into a 2d list - arr
}
g = new Graph()                         // Create a new graph object 

// Create vertices for people
for (let i = 0; i < numPeople; i++) {
    g.addVertex(i)                      // Each person is set to a vertice
}
// Add edges
for (let i = 0; i < numPeople; i++) {
    // Only check top half (can check bottom if preferred)
    for (let j = i + 1; j < numPeople; j++) {
        if (arr[i][j] === "0") {
            g.addEdge(i, j)             // Edges represent enemies
        }
    }
}
// ACTUAL ALGORITHM:
// Check Seperation Possible
let g1 = [], g2 = []                                            // Define empty lists for each group
for (let i = 0; i < numPeople; i++) {                           // Loop through every person
    enemy = g.checkAdj(i)                                       // Check all enemies of person
    if (!enemy.some(x => g1.indexOf(x)>-1)){g1.push(i)}         // If the person does NOT have enemies in group 1 add to group 1
    else if (!enemy.some(x => g2.indexOf(x)>-1)){g2.push(i)}    // If the person has enemies in group 1 AND does NOT have enemies in group 2 add to group 2
    else{                                                       // If the person HAS enemies in both groups then seperation is not possible
        console.log("Seperation not possible")
        process.kill(0)                                         // If seperation not possible kill program
    }
}
console.log("Group 1: " + g1 + "\nGroup 2: " + g2)              // Output group results