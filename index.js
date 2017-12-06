

function signIn() {
  let divContain = document.createElement("div")
  let userHead = document.getElementById("userHeader")
  divContain.innerHTML = ""
  userHead.innerHTML = `<h1>User Page</h1><div id="buttonDiv"></div>`
  resultsClear = document.getElementById("results")
  resultsClear.innerHTML = ""
  divContain.id = "signIn2"
  divContain.innerHTML = `
  <form id="signUpForm" name="signupform">
  <br>
  <input type="text" placeholder="username" name="name"><br>
  <input type="submit" value="Sign Up"></form>
  </form>
  <form id="signInForm" name="signinform">
  <br>
  <input type="text" placeholder="username" name="name"><br>
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
  let resultsDiv = document.getElementById("results")
  resultsDiv=""
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

// -------------^ -- login page exp ----^---------
//

// function trigger() {
//   document.addEventListener("DOMContentLoaded", function(){
//     let resultsDiv = document.getElementById("results")
//     fetch('http://localhost:3000/users')
//     .then(res => res.json())
//
//     .then(users => landingPage(users))
//   })
// }



function landingPageFetch(event) {
  let userInput= event.srcElement.elements[0].value
  event.preventDefault()
  let resultsDiv = document.getElementById("results")
  resultsDiv=""
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


  // let passEvent = event
  // let userInput= event.srcElement.elements[0].value
  //
  // let resultsDiv = document.getElementById("results")
  // let divClear = document.getElementById("signIn2")
  // divClear.innerHTML =""
  // resultsDiv.innerHTML = ""
  //
  // document.addEventListener("keydown", function(){
  //   fetch('http://localhost:3000/users')
  //   .then(res => res.json())
  //   .then(users => landingPage(users, userInput, passEvent))
  // })


// -------------------call backs for landingPage()------------------------//

function getUserInfo(arg) {
  let signInForm = document.getElementById("signUpForm").remove()
  let resultsDiv = document.getElementById("results")
  resultsDiv.innerHTML = ""

  let divClear = document.getElementById("signIn2").remove()

  let buttonDiv = document.getElementById("buttonDiv")
  let button = document.createElement("button")
  button.innerText =("Create Template")
  buttonDiv.appendChild(button)
  buttonDiv.addEventListener("click", editor)

  resultsUl = document.createElement("ul")

  arg.templates.forEach(template => {
    templateList = document.createElement("li")
    templateList.innerText = template.name
    resultsUl.appendChild(templateList)
  })
  resultsDiv.appendChild(resultsUl)
}


function editor() {

  editorElement = document.createElement("textarea")
  editorElement.id = "editor1"
  results = document.getElementById("results")
  results.appendChild(editorElement)
  CKEDITOR.replace( 'editor1' )
  console.log(event)


}

//
//
//
// function displayBooks(books){
// 	let listUl = document.getElementById("list")
// 	let detailsContainer = document.getElementById("details")
//
// 	listUl.innerHTML = ""
// 	detailsContainer.innerHTML = ""
//
//
// 	books.forEach(book => {
// 		let newLi = document.createElement('li')
//
// 		newLi.id = "book-" + book.id
// 		newLi.innerText = book.title
//
// 		newLi.addEventListener("click", (event) => {
//
// 			detailsContainer.innerHTML = `
// 				<h3>${book.title}</h3>
// 				<h5>By: ${book.author}</h5>
// 				<textarea id="book-review-input-${book.id}"  placeholder="Write a review..."></textarea>
// 				<br>
// 				<button id="review-submit-button-${book.id}">Submit Review</button>
// 				<ul id="book-reviews-${book.id}"></ul>
// 			`
//
// 			let reviewSubmit = document.getElementById(`review-submit-button-${book.id}`)
//
// 			reviewSubmit.addEventListener("click", (event)=>{
// 				let textInput = document.getElementById(`book-review-input-${book.id}`)
//
// 				let input = textInput.value
//
//
// 				let object = {
// 					method: "POST",
// 					headers: {
// 						'Content-Type': "application/json",
// 						'Accept': "application/json"
// 					},
// 					body: JSON.stringify({content: input, beef: book.id})
// 				}
//
//
// 				fetch("http://localhost:3000/reviews", object)
// 				.then(res => res.json())
// 				.then(console.log)
//
// 			})
//
//
// 			let reviewsUl = document.getElementById(`book-reviews-${book.id}`)
//
// 			book.reviews.forEach(review => {
// 				let newReviewLi = document.createElement('li')
//
// 				newReviewLi.id = "review-" + review.id
// 				newReviewLi.innerText = review.content
//
// 				reviewsUl.appendChild(newReviewLi)
// 			})
//
//
// 		})
//
// 		listUl.appendChild(newLi)
// 	})
// }
