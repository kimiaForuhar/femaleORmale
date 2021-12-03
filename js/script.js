document.getElementById("submit").onclick = function (event) {
  event.preventDefault();
  input = document.getElementById("person-name").value;
  if (validName(input)) {
    document.getElementById("female").checked = false;
    document.getElementById("male").checked = false;
    var request = new XMLHttpRequest();
    request.open("GET", `https://api.genderize.io/?name=${input}`, false);
    request.send(null);
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
    }
  }
};

function validName(input) {
  var re = /^[a-zA-Z]{1,255}$/;
  return re.test(input);
}
