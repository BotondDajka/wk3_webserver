let homeButton = document.getElementById("homeButton");
let aboutButton = document.getElementById("aboutButton");

homeButton.style.cursor = "pointer";
aboutButton.style.cursor = "pointer";

homeButton.onclick = ()=>{
    window.location.href = '/'
}

aboutButton.onclick = ()=>{
    window.location.href = '/about'
}