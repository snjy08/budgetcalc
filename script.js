function signup() {
    window.location = './register.html'
}
function createuser() {
    let regdet = {
        uname: uname.value,
        email: email.value,
        pswd: pswd.value
    };

    if (regdet.uname === "" || regdet.pswd === "" || regdet.email === "") {
        alert("Please fill all fields");
    } else {
        if (regdet.uname in localStorage) {
            alert("User already exists");
            document.getElementById("regform").reset();
        } else {
            localStorage.setItem(regdet.uname, JSON.stringify(regdet));
            alert("User Details Successfully Added");
            window.location = './index.html';
        }
    }
}

// Function for login
function login_acc() {
    let uname = document.getElementById("uname").value;
    let pass = document.getElementById("pswd").value;

    if (uname === "" || pass === "") {
        alert("Please enter username and password");
    } else {
        // Check if user details exist
        if (uname in localStorage) {
            let regdetails = JSON.parse(localStorage.getItem(uname));
            if (pass === regdetails.pswd) {
                localStorage.setItem('loggedobj', JSON.stringify(regdetails))
                localStorage.setItem('loggedkey', uname)
                alert("Login successful");
                window.location = './home.html';
            } else {
                alert("Invalid username or password");
            }
        } else {
            alert("User does not exists");
        }
    }
}


// home

const loggedInUser = localStorage.getItem("loggedkey");
console.log(loggedInUser);
let head1 = document.getElementById("headwelcome");
head1.innerHTML = `Welcome ${loggedInUser}`;

function logout() {
    window.location = './index.html';
}

let expElm = document.getElementById("exp");
let balElm = document.getElementById("bal");
let amtElm = document.getElementById("amt");

function setamt() {

    let totalAmt = document.getElementById("totAmt").value;
    if (totalAmt === "") {
        alert("Enter the amount!");
    } else {
        localStorage.setItem('total', totalAmt)
        amtElm.innerHTML = totalAmt;
        bal.innerHTML = totalAmt;
        alert("Amount Added");
    }

}
function checkamt() {

    let exptype = document.getElementById("expType").value;
    let expamt = document.getElementById("expAmt").value;
    if (expamt === "" || exptype === "") {
        alert("Please enter the amount and type");
    } else {
        let totalAmt = parseFloat(localStorage.getItem('total')) || 0;
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        let newTotalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;

        // Update total expenses
        newTotalExpenses += parseFloat(expamt);
        localStorage.setItem('totalExpenses', newTotalExpenses.toFixed(2));

        let newBalance = totalAmt - parseFloat(newTotalExpenses);
        expenses.push({ type: exptype, amount: expamt, balance: newBalance });
        localStorage.setItem('expenses', JSON.stringify(expenses));

        expElm.innerHTML = newTotalExpenses.toFixed(2);
        balElm.innerHTML = `${newBalance.toFixed(2)}`;
        alert("Expense Added");
        displayExpenses();
    }
}



//function to add expense to a list using type and amt
function displayExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let expensedetails = document.getElementById("expensedetails");
    let tableHTML = "";

    expenses.forEach(expense => {
        tableHTML += `
        
        <tr>
        <td>${expense.type}</td>
        <td>${expense.amount}</td>
        <td>${expense.balance}</td></tr>`;
    });
    expensedetails.innerHTML = tableHTML;
}

function clearrecord() {
    let ask = confirm("Are you sure to delete all data ?")
    if (ask) {
        document.getElementById("expForm").reset();
        document.getElementById("setForm").reset();
        amtElm.innerHTML = "0";
        expElm.innerHTML = "0";
        balElm.innerHTML = "0";
        document.getElementById("expensedetails").innerHTML = '';
    }
    alert("Cleared all data successfully");
}