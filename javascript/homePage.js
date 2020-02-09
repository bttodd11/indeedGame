let value;

const output = document.getElementById("value");
const slider = document.getElementById("myRange");

output.innerHTML = slider.value;


slider.oninput = () => {
    output.innerHTML = slider.value;
    if(output.innerHTML >= 50){
        output.style.color = "red";
    }
    else{
        output.style.color = "green";
    }
  }

  const test = () => {
    console.log("test");
}