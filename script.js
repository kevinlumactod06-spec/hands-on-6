let numbers = [];

function insertNumber() {

    const input = document.getElementById("numberInput");
    const value = Number(input.value);

    if (input.value === "" || value <= 0 || !Number.isInteger(value)) {
        alert("Please enter a positive whole number.");
        return;
    }

    numbers.push(value);

    displayNumbers();

    input.value = "";
    input.focus();

    clearResults();
}


function displayNumbers() {

    const list = document.getElementById("numberList");

    list.innerHTML = "";

    numbers.forEach(function(number, index) {

        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = number;

        const typeCell = document.createElement("td");

        if (number % 2 === 0) {
            typeCell.textContent = "EVEN";
            typeCell.style.color = "green";
        } else {
            typeCell.textContent = "ODD";
            typeCell.style.color = "blue";
        }

        const removeCell = document.createElement("td");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.onclick = function() {
            removeNumber(index);
        };

        removeCell.appendChild(removeButton);


        const editCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = function() {
            editNumber(index);
        };

        editCell.appendChild(editButton);


        row.appendChild(numberCell);
        row.appendChild(typeCell);
        row.appendChild(removeCell);
        row.appendChild(editCell);

        list.appendChild(row);
    });
}


function removeNumber(index) {

    numbers.splice(index, 1);

    displayNumbers();

    clearResults();
}


function editNumber(index) {

    const newValue = prompt(
        "Enter new number:",
        numbers[index]
    );

    if (newValue === null) {
        return;
    }

    const value = Number(newValue);

    if (
        newValue.trim() === "" ||
        value <= 0 ||
        !Number.isInteger(value)
    ) {
        alert("Please enter a positive whole number.");
        return;
    }

    numbers[index] = value;

    displayNumbers();

    clearResults();
}


function clearEntry() {

    document.getElementById("numberInput").value = "";

    document.getElementById("numberInput").focus();
}


function clearItems() {

    numbers = [];

    displayNumbers();

    clearResults();

    document.getElementById("sortSelect").value = "";
}


function getTotal() {

    if (numbers.length === 0) {
        alert("There are no numbers inserted.");
        return;
    }

    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }

    const results = document.getElementById("results");

    results.innerHTML = `
        <tr>
            <td><b>TOTAL</b></td>
            <td><b><u>${total}</u></b></td>
        </tr>
    `;
}


function identifyHighestLowest() {

    if (numbers.length === 0) {
        alert("There are no numbers inserted.");
        return;
    }

    const highest = Math.max(...numbers);
    const lowest = Math.min(...numbers);

    const results = document.getElementById("results");

    results.innerHTML = `
        <tr>
            <td><b>HIGHEST</b></td>
            <td><b><u>${highest}</u></b></td>
        </tr>

        <tr>
            <td><b>LOWEST</b></td>
            <td><b><u>${lowest}</u></b></td>
        </tr>
    `;
}


function sortNumbers() {

    const sortOption = document.getElementById("sortSelect").value;

    if (sortOption === "") {
        return;
    }

    if (numbers.length === 0) {
        alert("There are no numbers to sort.");
        return;
    }

    if (sortOption === "ascending") {

        numbers.sort(function(a, b) {
            return a - b;
        });

    } else if (sortOption === "descending") {

        numbers.sort(function(a, b) {
            return b - a;
        });
    }

    displayNumbers();

    clearResults();
}


function clearResults() {

    document.getElementById("results").innerHTML = "";
}

