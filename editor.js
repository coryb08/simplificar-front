let upload = document.getElementById('upload')

upload.addEventListener('click',uploadData())
var data = CKEDITOR.instnces.editor1.getData()

upload.addEventListener('click',uploadData)


function uploadData(){
  var data = CKEDITOR.instances.editor1.getData()
  fetch("http://localhost:3000/templates",{method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: "Template 1",
        description: "This is a test",
        content: data,
        user_id: 1
      })})
      .then(res=> res.json())
      .then(console.log)
  }
