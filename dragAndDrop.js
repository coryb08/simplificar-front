// global elements

var div1=document.getElementById(`div1`);
var modal = document.getElementById('myModal');
var modalContent = document.getElementById('modalContent')
var span = document.getElementsByClassName("close")[0];

// Event Listeners

document.addEventListener("DOMContentLoaded",()=>{

  // Modal event Listeners
  span.onclick = function() {
      modal.style.display = "none";
    }

    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }

})

// Functions


function allowDrop(ev) {
    ev.preventDefault();
    console.log(ev)

}

function drag(ev){
  // ev.currentTarget.style.border = "dashed";
  console.log(`clientX=${ev.clientX} --- clientY=${ev.clientY}`)
  ev.dataTransfer.setData("text", [ev.target.id,ev.clientX,ev.clientY]);
  let data = ev.dataTransfer.getData("text")
  console.log(data.split(","))
  // console.log(`target id: ${data.id}, clientX: ${data.x}, clientY: ${data.y}`)
  ev.dataTransfer.effectAllowed = "copy"
  ev.dataTransfer.dropEffect="copy"

}

function drop(ev) {
  ev.preventDefault();
  // debugger;
  //data string with 3 values (target id, clientX and clientY)
  //creating and object with the data
    var data = ev.dataTransfer.getData("text").split(",");
    data={id:data[0],x:data[1],y:data[2]}
    console.log(`target id: ${data.id}, clientX: ${data.x}, clientY: ${data.y}`)
    if (data.id === "image"){
      let new_image = document.createElement('img')
      new_image.id = `image-${document.querySelectorAll("#div1 img").length + 1 }`
      modalContent.innerHTML = imageForm()
      // debugger;
      displayModal(new_image)
      console.log(new_image.id)
      div1.appendChild(new_image)
  }else {
    current_image= document.getElementById(data.id)
    let container_height= parseInt(window.getComputedStyle(div1).height)
    let container_width = parseInt(window.getComputedStyle(div1).width)

    // if ((ev.x+current_image.width)<= container_width) {
    //   new_x= ev.x}
    //   else{
    //     new_x = container_width - current_image.width
    //   }
    // if ((ev.y+current_image.height)<= container_height) {
    //   new_x= ev.y}
    //   else{
    //     new_y = container_height - current_image.height
    //   }
    //   current_image.style=`position: absolute; left:${ev.x}px; top:${ev.y}px`
    //   console.log(`position: absolute; left:${ev.x}px; top:${ev.y}`)
    //   console.log(ev)
    debugger;
  }
}

function appendChild(ev,event,image){
  ev.target.appendChild(image)
  image.style=`position: relative; left:${ev.x}px; top:${ev.y}px`
}
function displayModal(image){
    modal.style.display = "block";
    // debugger;
    modal.addEventListener("submit",()=>updateElement(image,event))
  }
  function updateElement(image,event){
    event.preventDefault()
    modalImage = document.getElementById('imageForm')
    // debugger;
    // let image = document.createElement('img')
    image.setAttribute("src", modalImage.elements.url.value);
    image.setAttribute("width", modalImage.elements.width.value);
    image.setAttribute("height", modalImage.elements.height.value);
    image.setAttribute("alt", modalImage.elements.alt.value);
    image.setAttribute("draggable",true)
    image.setAttribute("ondragstart","drag(event)")
    image.setAttribute("ond")
    // appendChild(ev,event,image)
    modalContent.innerHTML=""
    modal.style.display = "none"
  }


function imageForm(){
  return `
  <div class="image-form">
  <form id="imageForm">
  <div class="container-1"
    <label>Url<br><input type="url" name="url" width="100px"><br></label>
    <label>Alt<br><input type="text" name="alt"><br></label>
    <label>Width<br><input type="number" name="width"><br></label>
    <label>Height<br><input type="number" name="height"><br></label>
    <label>Border<br><input type="number" name="border"><br></label>
    <label>Hspace<br><input type="number" name="hSpace"><br></label>
    <label>Vspace<br><input type="number" name="vSpace"><br></label>
    <label>Alignment<br><input type="number" name="alignment"><br></label>
    </div>
    <input type="submit">
    <div>
    </form>
</div>`
}
// window.getComputedStyle(element)
