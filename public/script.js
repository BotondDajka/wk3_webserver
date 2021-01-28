let homeButton = document.getElementById("homeButton");
let aboutButton = document.getElementById("aboutButton");

homeButton.style.cursor = "pointer";
aboutButton.style.cursor = "pointer";


homeButton.onclick = ()=>{
    if (!window.location.href.endsWith("/")){
        $("#container").slideUp(300, function(){
                window.location.href = '/'    
        })
    }
    
}
aboutButton.onclick = ()=>{
    if (!window.location.href.endsWith("about")){
        $("#container").slideUp(300, function(){
            if (window.location.href != '/'){
                
            }
            window.location.href = '/about'
        })
    }
}


try{
    let logoutButton = document.getElementById("logoutButton");
    if(logoutButton){
        logoutButton.style.cursor = "pointer";
        logoutButton.onclick = ()=>{
            if (!window.location.href.endsWith("logout")){
                $("#container").slideUp(300, function(){
                    if (window.location.href != '/'){
                
                    }
                    window.location.href = '/logout'
                })
            }
        }
    }
}catch{}

try{
    let loginButton = document.getElementById("loginButton");
    loginButton.style.cursor = "pointer";
    loginButton.onclick = ()=>{
        if (!window.location.href.endsWith("login")){
            $("#container").slideUp(300, function(){
                if (window.location.href != '/'){
                
                }
                window.location.href = '/login'
            })
        }
    }
}catch{}


try{
    
    let adminButton = document.getElementById("adminButton");
    adminButton.style.cursor = "pointer";
    adminButton.onclick = ()=>{
        if (!window.location.href.endsWith("admin")){
            $("#container").slideUp(300, function(){
                if (window.location.href != '/'){
                
                }
                window.location.href = '/admin'
            })
        }
    }
}catch{}






