const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");
const day = document.querySelector(".day");
const time = document.querySelector(".time");
const damatebulebi = document.querySelector(".damatebulebi");
const ErrorText = document.getElementById("ErrorText");

// romeli dgea da romeli rricxvia
let today = new Date();
var dge = today.getDay();
var ricxvi = today.getDate();
let Sricxvi = String(ricxvi);
let dayList = ["Sun ", "Mon ", "Tue ", "Wend ", "Thur ", "Fri ", "Sat "];
let data = dayList[dge] + Sricxvi;
day.textContent = data;

// ROMELI SAATIA DA WUTI
let hour = today.getHours();
let minute = today.getMinutes();
let prepand = hour >= 12 ? "PM" : "AM";
hour = hour >= 12 ? hour - 12 : hour;
minute = minute < 10 ? "0" + minute : minute;
time.textContent = hour + ":" + minute + " " + prepand;




//localidan gverdze gamotana
document.addEventListener('DOMContentLoaded', loadTasks);


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createHTMLContent(task.text,task.time, task.checked);
    });
}





//localshi shenaxva
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    ErrorText.textContent = "";
    
    if (taskInput.value.length == 0) {
        ErrorText.textContent = "შეიყვანე სახელწოდება";
    } else {
        const tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
        const damatebisDro = `Today at ${hour}:${minute} ${prepand}`;
        const newTask = {
            text: taskInput.value,
            time:damatebisDro,
            checked: true
            
        };
        tasks.push(newTask);
        saveTasks(tasks);
        createHTMLContent(taskInput.value,time, newTask.checked);
        taskInput.value = ""; 
    }
});



function createHTMLContent(text, isChecked) {
    let MainDiv = document.createElement("div");
    let LeftDiv = document.createElement("div");
    let RightDiv = document.createElement("div");
    MainDiv.classList.add("first");
    LeftDiv.classList.add("left");
    RightDiv.classList.add("right");
    damatebulebi.appendChild(MainDiv);
    MainDiv.appendChild(LeftDiv);
    MainDiv.appendChild(RightDiv);
    
    let MainP = document.createElement("p");
    let damatebisDro = document.createElement("p");
    MainP.textContent = text;
    damatebisDro.textContent = "Today at " + hour + ":" + minute + " " + prepand;
    LeftDiv.appendChild(MainP);
    LeftDiv.appendChild(damatebisDro);
    
    MainP.classList.add("main");
    damatebisDro.classList.add("damatebisDro");
    
    RightDiv.innerHTML = `
    <input type="checkbox" id="checkbox-${text}" ${isChecked ? 'checked' : ''}>
    <label for="checkbox-${text}"></label>
    <button id="btn"><i class="fa-regular fa-trash-can"></i></button>
    `;
    
    
    
    
    //washla
    let button = RightDiv.querySelector("#btn");
    button.addEventListener("click", function () {
        MainDiv.remove();
        const tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
        const updatedTasks = tasks.filter(task => task.text !== text);
        saveTasks(updatedTasks);
    });
    
    
    
    
    // chekbox
    let checkbox = RightDiv.querySelector(`#checkbox-${text}`);
    checkbox.addEventListener("change", function () {
        const tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
        const updatedTasks = tasks.map(task => {
            if (task.text === text) {
                task.checked = checkbox.checked;
            }
            return task;
        });
        saveTasks(updatedTasks);
        
        
    });
    
    

}








