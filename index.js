

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
  <input type="text" placeholder="<username>" name="name" class="transparent-input"><br><br>
  <input type="submit" value="Sign Up" class="button456"></form>
  </form>
  <form id="signInForm" name="signinform">
  <br>
  <input type="text" placeholder="<username>" name="name" class="transparent-input"><br><br>
  <input type="submit" value="Sign In" class="button456"></form>
  </form>
  `
  userHead.appendChild(divContain)
  form = document.getElementById('signUpForm')
  form2 = document.getElementById('signInForm')
  form.addEventListener("submit",landingPageFetch)
  form2.addEventListener("submit", login)

}
console.log(document.getElementById("div1"))
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



function getUserInfo(userObj) {
  let signInForm = document.getElementById("signUpForm").remove()
  let eraserDiv = document.getElementById("eraserDiv")
  eraserDiv.innerHTML = ""
  let divClear = document.getElementById("signIn2").remove()
  let formDiv = document.getElementById("formDiv")
  resultsUl = document.createElement("ul")
  console.log(userObj.templates)
  userObj.templates.forEach(template => {
    console.log(`inside the array`)
    console.log(template)
    let list = document.createElement("p")
    list.setAttribute("class", "tempList")
    list.innerText=template.name
    let iTagDrag = document.createElement("input")
    iTagDrag.setAttribute("type", "button")
    iTagDrag.setAttribute("value", "Edit")
    iTagDrag.addEventListener("click", function() {
      editor(userObj, template.name)
    })
    list.appendChild(iTagDrag)
    resultsUl.appendChild(list)
})
eraserDiv.appendChild(resultsUl)

}


function editor(userObj, name) {
  store = userObj
  let editId = document.getElementById("editId")
  editId.innerHTML = ""
  editorElement = document.createElement("textarea")
  editorElement.id = "editor1"

  userObj.templates.forEach(template => {
    if (template.name === name) {
      editorElement.innerHTML = template.content
    }
  })

  editId.appendChild(editorElement)

  CKEDITOR.replace( 'editor1' )
  let upload = document.createElement("button")
  var data = CKEDITOR.instances.editor1.getData()
  upload.addEventListener('click',uploadData)

  function uploadData(){
    var data = CKEDITOR.instances.editor1.getData()
    fetch("http://localhost:3000/templates",{method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: name,
          content: data,
          user_id: userObj.id
        })})
        .then(res=> res.json())
        .then(json => editor(store, json.name))
    }
    editId.appendChild(upload)
}
