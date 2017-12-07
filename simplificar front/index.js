

function signIn() {
  let divContain = document.createElement("div")
  let userHead = document.getElementById("formDivMain")
  divContain.innerHTML = ""
  userHead.innerHTML = `<div id="formDiv" class="homeForm"></div>`
  resultsClear = document.getElementById("eraserDiv")
  resultsClear.innerHTML = ""
  divContain.id = "signIn2"
  divContain.innerHTML = `
  <form id="signUpForm" name="signupform" class="formAlt">
  <br>
  <input type="text" placeholder="<username>" name="name" class="transparent-input"><br>
  <input type="submit" value="Sign Up"></form>
  </form>
  <form id="signInForm" name="signinform">
  <br>
  <input type="text" placeholder="<username>" name="name" class="transparent-input"><br>
  <input type="submit" value="Sign In"></form>
  </form>
  `
  userHead.appendChild(divContain)
  form = document.getElementById('signUpForm')
  form2 = document.getElementById('signInForm')
  form.addEventListener("submit",landingPageFetch)
  form2.addEventListener("submit", login)

}
signIn()

function login(event) {
  event.preventDefault()
  let userInput= event.srcElement.elements[0].value
  let eraserDiv = document.getElementById("eraserDiv")
  eraserDiv=""
  fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(json => findUser(json, userInput))
}

function findUser(json, userInput) {
  console.log(json)
  console.log(userInput)
  let result = "That user doesn't exist"

  json.forEach(user => {
    if (user.name.toLowerCase()===userInput.toLowerCase()) {
      result = null
      getUserInfo(user)

    }
  })
  if (result) {
    alert(result)
    signIn()
  }


}



function landingPageFetch(event) {
  let userInput= event.srcElement.elements[0].value
  event.preventDefault()
  let eraserDiv = document.getElementById("eraserDiv")
  eraserDiv=""
  let object = {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
      'Accept': "application/json"
    },
    body: JSON.stringify({name: userInput})
  }

  fetch('http://localhost:3000/users', object)
  .then(res => res.json())
  .then(json => showErrors(json))
}


function showErrors(json) {
  let newStr =""
  if (json.errors === undefined) {
    getUserInfo(json)
  } else {
    json.errors.name.forEach(error => {
      newStr += error + "\n"
    })
    alert(newStr)
  }
}


function getUserInfo(arg) {
  let signInForm = document.getElementById("signUpForm").remove()
  let eraserDiv = document.getElementById("eraserDiv")
  eraserDiv.innerHTML = ""

  let divClear = document.getElementById("signIn2").remove()

  let formDiv = document.getElementById("formDiv")
  let button = document.createElement("button")
  button.innerText =("Create Template")
  formDiv.appendChild(button)
  formDiv.addEventListener("click", editor)

  resultsUl = document.createElement("ul")

  arg.templates.forEach(template => {
    templateList = document.createElement("li")
    templateList.innerText = template.name
    resultsUl.appendChild(templateList)
  })
  eraserDiv.appendChild(resultsUl)
}


function editor() {
  let editId = document.getElementById("editId")
  editorElement = document.createElement("div")
  editorElement.id = "editor1"

  editId.appendChild(editorElement)

  CKEDITOR.replace( 'editor1' )



}
