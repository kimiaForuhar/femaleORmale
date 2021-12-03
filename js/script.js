const error = document.querySelector(".error");
document.getElementById("submit").onclick = function (event) {
  event.preventDefault();
  input = document.getElementById("person-name").value;
  if (validName(input)) {
    document.getElementById("female").checked = false;
    document.getElementById("male").checked = false;
    var request = new XMLHttpRequest();
    request.open("GET", `https://api.genderize.io/?name=${input}`, false);
    try {
      request.send(null);
    } catch (error) {
      showErrorMessage(error);
    }
    var response = JSON.parse(request.response);
    document.getElementById("gender").innerHTML = response.gender;
    if (response.gender == null)
      document.getElementById("gender").innerHTML = "null";
    document.getElementById("probability").innerHTML = response.probability;
    if (localStorage.getItem(input) !== null) {
      document.getElementById("saved-name").innerHTML =
        localStorage.getItem(input);
    } else {
      document.getElementById("saved-name").innerHTML = "not saved";
    }
  } else {
    showErrorMessage("not a valid name");
  }
};
document.getElementById("save").onclick = function (event) {
  input = document.getElementById("person-name").value;
  if (validName(input)) {
    if (
      !document.getElementById("male").checked &&
      !document.getElementById("female").checked
    ) {
      localStorage.setItem(input, document.getElementById("gender").innerHTML);
    } else if (document.getElementById("male").checked)
      localStorage.setItem(input, "male");
    else if (document.getElementById("female").checked)
      localStorage.setItem(input, "female");
    document.getElementById("saved-name").innerHTML =
      localStorage.getItem(input);
  } else {
    showErrorMessage("not a valid name");
  }
};

document.getElementById("clear").onclick = function (event) {
  input = document.getElementById("person-name").value;
  if (validName(input)) {
    try {
      localStorage.removeItem(input);
      document.getElementById("saved-name").innerHTML = "not Saved";
    } catch (err) {
      console.log(err);
      showErrorMessage(err);
    }
  } else {
    showErrorMessage("not a valid name");
  }
};

function validName(input) {
  var re = /^[a-zA-Z]{1,255}$/;
  return re.test(input);
}
function showErrorMessage(message) {
  console.log(message);
  error.classList.add("active");
  error.innerHTML = message;
  setTimeout(() => {
    // removes the error message from screen after 4 seconds.
    error.classList.remove("active");
  }, 4000);
}
