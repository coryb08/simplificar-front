document.addEventListener("DOMContentLoaded", function(){
  let resultsDiv = document.getElementById("results")
  fetch('http://localhost:3000/users')
  .then(res => res.json())

  .then(users => landingPage(users))
})



function landingPage(users) {
  let resultsDiv = document.getElementById("results")

  resultsDiv.innerHTML = ""
  let resultsUl = document.createElement("ul")
  users.forEach(user => {

    let linkElement = document.createElement("li")
    linkElement.id = `userId-${user.id}`
    linkElement.addEventListener("click", ()=> getUserInfo(user))
    linkElement.innerText = user.name
    resultsUl.appendChild(linkElement)
  })

  resultsDiv.appendChild(resultsUl);

}





// -------------------call backs for landingPage()------------------------//

  function getUserInfo(arg) {
    let buttonDiv = document.getElementById("buttonDiv")
    let button = document.createElement("button")
    button.innerText =("Create Template")
    buttonDiv.appendChild(button)
    buttonDiv.addEventListener("click", editor)

    let resultsDiv = document.getElementById("results")
    resultsUl = document.createElement("ul")
    resultsDiv.innerHTML = ""
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



  }

























//
//
//
//
//
// document.addEventListener("DOMContentLoaded", function() {
//   const imageId = 41; //Enter your assigned imageId here
//   const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
//   const likeURL = `https://randopic.herokuapp.com/likes/`;
//   const commentsURL = `https://randopic.herokuapp.com/comments/`;
//   const likeListener = document
//     .getElementById("like_button")
//     .addEventListener("click", addLike);
//   const formListener = document
//     .getElementById("comment_form")
//     .addEventListener("submit", persistComment);
//
//
//   function persistComment(event) {
//     event.preventDefault();
//     fetch(commentsURL, {
//       method: "post",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         image_id: imageId,
//         content: document.getElementById("comment_input").value
//       })
//     })
//       .then(res => res.json())
//       .then(json => addComment(json));
//   }
//
//
//   function addComment(commentData) {
//     let comment = commentData.content;
//     let commentsList = document.getElementById("comments");
//     commentsList.innerHTML += `<li>${comment}</li>`;
//   }
//
//
//   function persistLike() {
//     fetch(likeURL, {
//       method: "post",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         image_id: imageId
//       })
//     })
//       .then(res => res.json())
//       .then(console.log);
//   }
//
//
//   function addLike() {
//     persistLike();
//     let likeCount = document.getElementById("likes");
//     likeCount.innerText = parseInt(likeCount.innerText, 10) + 1;
//   }
//   function render(json) {
//     let image = document.getElementById("image");
//     let likeCount = document.getElementById("likes");
//     let imageName = document.querySelector("#name");
//     let commentList = document.querySelector("#comments");
//     image.src = json.url;
//     image.dataset.id = json.id;
//     likeCount.innerText = json.like_count;
//     imageName.innerText = json.name;
//     json.comments.forEach(comment => {
//       //create DOM element
//       let li = document.createElement("li");
//       li.innerText = comment.content;
//       commentList.append(li);
//     });
//   }
//   fetch(imageURL)
//     .then(response => response.json())
//     .then(json => render(json));
// });
