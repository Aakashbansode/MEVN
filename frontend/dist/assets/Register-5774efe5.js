import{u as k,h as _,i as A,j as f,o as V,a as u,c as m,e as E,b as o,k as e,t as b,l as w,w as d,v as p,m as q,F as C,d as S,n as h}from"./index-505dce3e.js";import{_ as T}from"./Navbar-8faa78d0.js";const U=()=>{const x=k();_(),A(()=>x.params.id);const a=f({name:"",age:"",qualification:"",address:"",email:"",password:"",confirm_password:"",todos:{}}),i=f(""),s=f(""),y=async()=>{try{const l={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a.value.email})},c=await(await fetch("http://localhost:3000/users/checkusers",l)).json();c.error?(i.value=c.error,console.log("Error:",c.error)):(i.value="",c.exists?console.log("This email is already registered."):(s.value="Email is available.",console.log("Email is available.")))}catch(l){console.error("Error checking email availability:",l),l.value="Error checking email availability"}},g=async()=>{try{await fetch("http://localhost:3000/todos/users").then(l=>l.json()).then(l=>{a.value.users=l})}catch(l){console.log(l)}};return{register:a,GetAllUsers:g,CreateAccount:()=>{if(a.value.password!==a.value.confirm_password){i.value="Password and confirm password must be the same";return}const l={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a.value.name,age:a.value.age,qualification:a.value.qualification,address:a.value.address,email:a.value.email,password:a.value.password})};fetch("http://localhost:3000/users/registernewuser",l).then(n=>n.json()).then(n=>{n.error?(i.value=n.error,console.log("Error:",n.error)):(i.value="",s.value="Account created successfully!",console.log("Account created:",n),g())}).catch(n=>{console.error(n),n.value="Failed to create account.",s.value=""})},checkEmailAvailability:y,error:i,successMessage:s}},j={key:0,class:"bg-red-500 text-white p-4 text-lg mb-4 text-center"},N={key:1,class:"bg-green-500 text-white p-4 text-lg mb-4 text-center"},P={class:"bg-grey-lighter min-h-screen flex flex-col mb-10"},O={class:"container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-slate-300 border border-gray-700"},B={class:"bg-white px-6 py-8 rounded shadow-md text-black w-full bg-slate-200 border-spacing-2"},M=o("h1",{class:"mb-8 text-3xl text-center"},"Sign up",-1),F=o("label",{for:"age"},"Age:",-1),R=o("option",{value:""},"Select Age",-1),D=["value"],G={key:0,class:"bg-red-500 text-white p-2 text-lg mb-2 text-center"},J=o("div",{class:"text-center text-sm text-grey-dark mt-4"},[h(" By signing up, you agree to the "),o("a",{class:"no-underline border-b border-grey-dark text-grey-dark",href:"#"}," Terms of Service "),h(" and "),o("a",{class:"no-underline border-b border-grey-dark text-grey-dark",href:"#"}," Privacy Policy ")],-1),L=o("div",{class:"text-grey-dark mt-6"},[h(" Already have an account? "),o("a",{class:"no-underline border-b border-blue text-blue",href:"../login/"}," Log in "),h(". ")],-1),H={__name:"Register",setup(x){const{successMessage:a,error:i,register:s,GetAllUsers:y,CreateAccount:g,checkEmailAvailability:v,editTodo:l}=U();V(()=>{y()});const n=f(Array.from({length:43},(c,r)=>r+18));return(c,r)=>(u(),m("div",null,[E(T),o("main",null,[e(i)?(u(),m("div",j,b(e(i)),1)):w("",!0),e(a)?(u(),m("div",N,b(e(a)),1)):w("",!0),o("div",P,[o("div",O,[o("div",B,[M,d(o("input",{"onUpdate:modelValue":r[0]||(r[0]=t=>e(s).name=t),type:"text",class:"block border border-grey-light w-full p-3 rounded mb-4",name:"fullname",placeholder:"Full Name"},null,512),[[p,e(s).name]]),F,d(o("select",{"onUpdate:modelValue":r[1]||(r[1]=t=>e(s).age=t),id:"age",name:"age",class:"block border border-grey-light w-full p-3 rounded mb-4"},[R,(u(!0),m(C,null,S(n.value,t=>(u(),m("option",{value:t,key:t},b(t),9,D))),128))],512),[[q,e(s).age]]),d(o("input",{"onUpdate:modelValue":r[2]||(r[2]=t=>e(s).qualification=t),type:"text",class:"block border border-grey-light w-full p-3 rounded mb-4",name:"qualification",placeholder:"qualification"},null,512),[[p,e(s).qualification]]),d(o("input",{"onUpdate:modelValue":r[3]||(r[3]=t=>e(s).address=t),type:"text",class:"block border border-grey-light w-full p-3 rounded mb-4",name:"address",placeholder:"address"},null,512),[[p,e(s).address]]),d(o("input",{"onUpdate:modelValue":r[4]||(r[4]=t=>e(s).email=t),type:"text",class:"block border border-grey-light w-full p-3 rounded mb-4",name:"email",placeholder:"Email",onBlur:r[5]||(r[5]=(...t)=>e(v)&&e(v)(...t))},null,544),[[p,e(s).email]]),d(o("input",{"onUpdate:modelValue":r[6]||(r[6]=t=>e(s).password=t),type:"password",class:"block border border-grey-light w-full p-3 rounded mb-4",name:"password",placeholder:"Password"},null,512),[[p,e(s).password]]),d(o("input",{"onUpdate:modelValue":r[7]||(r[7]=t=>e(s).confirm_password=t),type:"password",class:"block border border-grey-light w-full p-3 rounded mb-4",name:"confirm_password",placeholder:"Confirm Password"},null,512),[[p,e(s).confirm_password]]),e(i)?(u(),m("span",G,b(e(i)),1)):w("",!0),o("button",{onClick:r[8]||(r[8]=(...t)=>e(g)&&e(g)(...t)),type:"submit",class:"w-full text-center py-3 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none my-1"},"Create Account"),J]),L])])])]))}};export{H as default};
