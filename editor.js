let upload = document.getElementById('upload')
upload.addEventListener('click',uploadData())
let data = CKEDITOR.instances.editor1.getData()


function uploadData(){
  fetch("https://loalhost/3000/template",{method: "POST",
      header: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: "Template 1",
        description: "This is a test",
        content: data,
        user_id: 1
      })})
      .then(res=> res.json())
      .then(console.log)
  }
//   // .then(res => res.json())
//   // .then(console.log)
