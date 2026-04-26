/* ============================================
   GYM ADMINISTRATION SYSTEM - SHARED JAVASCRIPT
   ============================================ */

// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================

function toggleTheme() {
    var body = document.body;
    var themeButton = document.getElementById("themeToggle");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        themeButton.innerHTML = "🌙";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.add("dark-mode");
        themeButton.innerHTML = "☀️";
        localStorage.setItem("theme", "dark");
    }
}

function loadTheme() {
    var savedTheme = localStorage.getItem("theme");
    var body = document.body;
    var themeButton = document.getElementById("themeToggle");

    if (themeButton == null) {
        return;
    }

    if (savedTheme == "dark") {
        body.classList.add("dark-mode");
        themeButton.innerHTML = "☀️";
    } else {
        body.classList.remove("dark-mode");
        themeButton.innerHTML = "🌙";
    }
}

window.onload = loadTheme;

// ============================================
// AUTHENTICATION DATA (Parallel Arrays)
// ============================================

var usernames = ["admin", "john_doe", "jane_smith", "user123"];
var passwords = ["password123", "john1234", "jane5678", "user9999"];

// ============================================
// SIGN UP VALIDATION
// ============================================

function validateSignup() {
    var fullname = document.forms["signupForm"]["fullname"].value;
    var email = document.forms["signupForm"]["email"].value;
    var username = document.forms["signupForm"]["username"].value;
    var password = document.forms["signupForm"]["password"].value;
    var confirmPassword = document.forms["signupForm"]["confirmPassword"].value;

    // Check if any field is empty
    if (fullname == "" || email == "" || username == "" || password == "" || confirmPassword == "") {
        window.alert("Invalid input! All fields are required.");
        return false;
    }

    // Check if passwords match
    if (password != confirmPassword) {
        window.alert("Passwords do not match!");
        return false;
    }

    // Check if username already exists
    var userExists = false;
    var i = 0;
    while (i < usernames.length) {
        if (usernames[i] == username) {
            userExists = true;
        }
        i = i + 1;
    }

    if (userExists) {
        window.alert("Username already exists! Please choose another.");
        return false;
    }

    // If all validations pass, show success
    // Add the new user to our parallel arrays so they exist in memory
    usernames[usernames.length] = username;
    passwords[passwords.length] = password;

    window.alert("Sign Up Successful! You can now sign in with your credentials.");
    console.log("New user registered: " + username);
    return false; // Return false to prevent page reload, preserving our JS variables
}

// ============================================
// SIGN IN VALIDATION
// ============================================

function validateSignin() {
    var username = document.forms["signinForm"]["username"].value;
    var password = document.forms["signinForm"]["password"].value;

    // Check if fields are empty
    if (username == "" || password == "") {
        window.alert("Invalid input! Username and password are required.");
        return false;
    }

    // Search through arrays for matching credentials
    var credentialsMatch = false;
    var i = 0;
    while (i < usernames.length) {
        if (usernames[i] == username && passwords[i] == password) {
            credentialsMatch = true;
        }
        i = i + 1;
    }

    if (credentialsMatch) {
        window.alert("Sign In Successful! Welcome " + username + "!");
        console.log("User signed in: " + username);
        return false; // Return false to prevent page reload
    } else {
        window.alert("Invalid username or password!");
        return false;
    }
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================

function validateContact() {
    var name = document.forms["contactForm"]["name"].value;
    var email = document.forms["contactForm"]["email"].value;
    var message = document.forms["contactForm"]["message"].value;

    // Check if any field is empty
    if (name == "" || email == "" || message == "") {
        window.alert("Invalid input! All fields are required.");
        return false;
    }

    // Simple email format check
    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        window.alert("Invalid email format!");
        return false;
    }

    window.alert("Thank you for contacting us, " + name + "! We will get back to you soon.");
    console.log("Contact form submitted by: " + name);
    return false;
}

// ============================================
// GYM PACKAGES DATA
// ============================================

var packageNames = ["Basic Membership", "Standard Membership", "Premium Membership", "Elite Membership"];
var packagePrices = [29.99, 49.99, 79.99, 129.99];
var packageDurations = ["1 Month", "1 Month", "1 Month", "1 Month"];
var packageDescriptions = [
    "Access to basic gym facilities",
    "Access to all gym facilities + group classes",
    "Full access + personal training (2 sessions/month)",
    "Full access + personal training (8 sessions/month)"
];

// ============================================
// CHECKOUT FUNCTIONS
// ============================================

function calculateTotal() {
    var basicQty = parseInt(document.forms["checkoutForm"]["basic_qty"].value) || 0;
    var standardQty = parseInt(document.forms["checkoutForm"]["standard_qty"].value) || 0;
    var premiumQty = parseInt(document.forms["checkoutForm"]["premium_qty"].value) || 0;
    var eliteQty = parseInt(document.forms["checkoutForm"]["elite_qty"].value) || 0;

    var total = (basicQty * 29.99) + (standardQty * 49.99) + (premiumQty * 79.99) + (eliteQty * 129.99);

    // Round to 2 decimal places
    total = Math.round(total * 100) / 100;

    document.getElementById("totalAmount").innerHTML = "$" + total.toFixed(2);
    return total;
}

function validateCheckout() {
    var basicQty = parseInt(document.forms["checkoutForm"]["basic_qty"].value) || 0;
    var standardQty = parseInt(document.forms["checkoutForm"]["standard_qty"].value) || 0;
    var premiumQty = parseInt(document.forms["checkoutForm"]["premium_qty"].value) || 0;
    var eliteQty = parseInt(document.forms["checkoutForm"]["elite_qty"].value) || 0;

    var totalQty = basicQty + standardQty + premiumQty + eliteQty;

    // Check if at least one package is selected
    if (totalQty == 0) {
        window.alert("Invalid input! Please select at least one membership package.");
        return false;
    }

    // Get customer info
    var fullname = document.forms["checkoutForm"]["fullname"].value;
    var email = document.forms["checkoutForm"]["email"].value;
    var phone = document.forms["checkoutForm"]["phone"].value;

    if (fullname == "" || email == "" || phone == "") {
        window.alert("Invalid input! Please fill in all customer information fields.");
        return false;
    }

    // Calculate total
    var total = calculateTotal();

    window.alert("Purchase Confirmed! Total: $" + total.toFixed(2) + "\n\nThank you for your order, " + fullname + "! A confirmation email will be sent to " + email + ".");
    console.log("Purchase completed for: " + fullname + ", Total: $" + total.toFixed(2));
    return false;
}
