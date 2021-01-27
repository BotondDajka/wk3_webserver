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


try{
    let logoutButton = document.getElementById("logoutButton");
    if(logoutButton){
        logoutButton.style.cursor = "pointer";
        logoutButton.onclick = ()=>{
            window.location.href = '/logout'
        }
    }
}catch{}

try{
    let loginButton = document.getElementById("loginButton");
    loginButton.style.cursor = "pointer";
    loginButton.onclick = ()=>{
        window.location.href = '/login'
    }
}catch{}


try{
    
    let adminButton = document.getElementById("adminButton");
    adminButton.style.cursor = "pointer";
    adminButton.onclick = ()=>{
        window.location.href = '/admin'
    }
}catch{}






