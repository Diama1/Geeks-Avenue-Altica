const toggle=document.querySelector(".toggle");
const nav=document.querySelector("nav");

toggle.addEventListener("click",e=>{
    e.preventDefault();
    nav.classList.toggle("active");
})