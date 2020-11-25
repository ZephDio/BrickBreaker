
document.querySelector(".login").addEventListener('click',() =>{
    
    
    const modallogin = document.querySelector(".modallogin");
    const modalregister = document.querySelector(".modalregister");
    
    modallogin.style.visibility = "visible";
    
    modallogin.addEventListener('click',(event) =>{
    if(event.target===modallogin){
        modallogin.style.visibility = "hidden";
    }
    });
    
    document.querySelector('#register').addEventListener('click',() =>{
        modallogin.style.visibility = "hidden";
        modalregister.style.visibility = "visible"
        modalregister.addEventListener('click',(event) => {
            if(event.target===modalregister){
               modalregister.style.visibility = "hidden" 
            }
        })
    })

})

