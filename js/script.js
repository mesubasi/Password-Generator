// The characters required to generate a password with the selected options
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// Colors for the password strength
const colors = {
  weak: "red",
  moderate: "orange",
  strong: "yellowgreen",
  veryStrong: "green",
};

// Password strength text
const passwordStrengthText = {
  weak: "Weak",
  moderate: "Moderate",
  strong: "Strong",
  veryStrong: "Very Strong",
};

// Get the password length, uppercase, lowercase, numbers, and symbols input
const form = document.getElementById("password-form");
const passwordLength = document.getElementById("password-length");
const includeUppercase = document.getElementById("include-uppercase");
const includeLowercase = document.getElementById("include-lowercase");
const includeNumbers = document.getElementById("include-numbers");
const includeSymbols = document.getElementById("include-symbols");

// Calculate the password strength and display it
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const length = +passwordLength.value;
  const hasUppercase = includeUppercase.checked;
  const hasLowercase = includeLowercase.checked;
  const hasNumbers = includeNumbers.checked;
  const hasSymbols = includeSymbols.checked;

  const password = generatePassword(
    length,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols
  );

  const passwordStrength = getPasswordStrength(password);
  const passwordInput = document.getElementById("password");
  passwordInput.value = password;
  passwordInput.style.backgroundColor = colors[passwordStrength];

  const passwordStrengthIndicator = document.getElementById("password-strength-indicator");
  passwordStrengthIndicator.textContent = passwordStrengthText[passwordStrength];
  passwordStrengthIndicator.style.backgroundColor = colors[passwordStrength];

  const weak = document.getElementById("weak");
  const moderate = document.getElementById("moderate");
  const strong = document.getElementById("strong");
  const veryStrong = document.getElementById("very-strong");

  weak.style.backgroundColor = "white";
  moderate.style.backgroundColor = "white";
  strong.style.backgroundColor = "white";
  veryStrong.style.backgroundColor = "white";

  if (passwordStrength === "weak") {
    weak.style.backgroundColor = colors.weak;
  } else if (passwordStrength === "moderate") {
    weak.style.backgroundColor = colors.weak;
    moderate.style.backgroundColor = colors.moderate;
  } else if (passwordStrength === "strong") {
    weak.style.backgroundColor = colors.weak;
    moderate.style.backgroundColor = colors.moderate;
    strong.style.backgroundColor = colors.strong;
  } else {
    weak.style.backgroundColor = colors.weak;
    moderate.style.backgroundColor = colors.moderate;
    strong.style.backgroundColor = colors.strong;
    veryStrong.style.backgroundColor = colors.veryStrong;
  }
});

// Generate a random password
function generatePassword(length, hasUppercase, hasLowercase, hasNumbers, hasSymbols) {
  let chars = "";
  if (hasUppercase) chars += uppercaseLetters;
  if (hasLowercase) chars += lowercaseLetters;
  if (hasNumbers) chars += numbers;
  if (hasSymbols) chars += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}

// Calculate the password strength
function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) {
    strength++;
    if (/[a-z]/.test(password)) {
      strength++;
    }
    if (/[A-Z]/.test(password)) {
      strength++;
    }
    if (/[0-9]/.test(password)) {
      strength++;
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      strength++;
    }
  }
  if (password.length >= 12) {
    strength++;
  }
  if (password.length >= 16) {
    strength++;
  }
  if (password.length >= 20) {
    strength++;
  }

  if (strength === 1) {
    return "weak";
  } else if (strength === 2 || strength === 3) {
    return "moderate";
  } else if (strength === 4 || strength === 5) {
    return "strong";
  } else {
    return "veryStrong";
  }
}


// Get the "Copy" button and password input elements
const copyPasswordButton = document.getElementById("copy-password");
const passwordInput = document.getElementById("password");

// Add a click event listener to the "Copy" button
copyPasswordButton.addEventListener("click", function () {
  // Select the password input text
  passwordInput.select();
  // Copy the selected text to the clipboard
  document.execCommand("copy");
  // Display an alert to indicate that the password has been copied
  alert("Password copied to clipboard!");
});
