let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
	slider.classList.add("moveslider");
	formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
	slider.classList.remove("moveslider");
	formSection.classList.remove("form-section-move");
});

/*
var firebaseConfig = {
    // Your Firebase project config goes here
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var db = firebase.firestore();
  

// Get references to the login and signup buttons
const loginBtn = document.getElementById('loginsubmit');
const signupBtn = document.getElementById('signupsubmit');

// Get references to the login and signup forms
const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

// Get reference to the submit button in the login form
const loginSubmitBtn = document.getElementById('loginsubmit');

// Add event listener to the login form submit button
loginSubmitBtn.addEventListener('click', (event) => {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  // Get references to the email and password inputs
  const emailInput = loginForm.querySelector('.email');
  const passwordInput = loginForm.querySelector('.password');

  // Check if the email and password inputs are filled in
  if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
    alert('Please fill in both email and password fields');
  } else {
    // Redirect user to home.html
    window.location.href = 'home.html';
  }
});*/
