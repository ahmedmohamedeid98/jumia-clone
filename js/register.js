var x=document.getElementById('fninp');
var y=document.getElementById('firstnamep');
var z=document.getElementById('scninp');
var l=document.getElementById('seconednamep');
var emailinp=document.getElementById('Emailsinp');
var emaillap=document.getElementById('emaillabel');
var passwordinp=document.getElementById('passes');
var passlap=document.getElementById('passwordlabel');
x.addEventListener('click',function(){
    y.innerHTML="first name";
    y.style.color='orange';
    x.style.outlineColor='white';
    x.style.borderBottomColor='orange'
    
   
})

z.addEventListener('click',function(){
l.innerHTML="last name";
l.style.color='orange';
z.style.outlineColor='white';
})

emailinp.addEventListener('click',function(){
    emaillap.innerHTML="Email";
    emailinp.style.borderBottomColor='orange';
    emaillap.style.color='orange';
    emailinp.style.outlineColor='white';

})
passwordinp.addEventListener('click',function(){
    passlap.innerHTML="password";
    passlap.style.color='orange'
    passwordinp.style.borderBottomColor='orange';
    passwordinp.style.outlineColor='white';
})
