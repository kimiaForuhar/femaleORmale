const error = document.querySelector(".error"); //error div

//adding a onclick function for submit button
document.getElementById("submit").onclick = function (event) {
  event.preventDefault(); //prevent default submit function of javascript
  input = document.getElementById("person-name").value; //input name value
  //check that its a valid name or not
  if (validName(input)) {
    document.getElementById("female").checked = false; //making radio button of female false
    document.getElementById("male").checked = false; //making radio button of male false
    var request = new XMLHttpRequest(); // making a new request
    request.open("GET", `https://api.genderize.io/?name=${input}`, false); //open a request on api endPoint and make a GET request
    try {
      request.send(null);
    } catch (error) {
      showErrorMessage(error); //show any error if we cant send the request
    }
    var response = JSON.parse(request.response); //getting the response
    //change the value of gender and probability after getting the response and change if we have any saved data
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
    //if its not valid show an error
  } else {
    showErrorMessage("not a valid name");
  }
};
//adding a onclick function for save button
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
//adding a onclick function for clear button

document.getElementById("clear").onclick = function (event) {
  input = document.getElementById("person-name").value; //get value of input
  //check that its a valid name or not
  if (validName(input)) {
    //remove the saved data in a try catch block
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
//check the name contains just a-z and A-Z and the length of it is valid
function validName(input) {
  var re = /^[a-zA-Z]{1,255}$/;
  return re.test(input);
}
//giving the error block visibility to show in page for 4 seconds
function showErrorMessage(message) {
  console.log(message);
  error.classList.add("active");
  error.innerHTML = message;
  setTimeout(() => {
    // removes the error message from screen after 4 seconds.
    error.classList.remove("active");
  }, 4000);
}
