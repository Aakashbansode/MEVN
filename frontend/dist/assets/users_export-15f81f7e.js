import{j as m,a as n,c,e as f,b as s,k as t,t as x,l as h,w as _,v,m as y,F as w,d as k}from"./index-505dce3e.js";import{_ as E}from"./Navbar-8faa78d0.js";const C=()=>{const i=m({email:"",age:""}),d=m(""),l=m("");return{users_export:()=>{const u=i.value.email,b=i.value.age,g={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:u,age:b})};fetch("http://localhost:3000/users/export",g).then(r=>r.blob()).then(r=>{const p=URL.createObjectURL(r),e=document.createElement("a");e.href=p,e.download="users.xlsx",document.body.appendChild(e),e.click(),document.body.removeChild(e)}).catch(r=>{console.error(r),r.value="Failed to export file.",l.value=""})},export_user:i,error:d,successMessage:l}},S={key:0,class:"bg-red-500 text-white p-4 text-lg mb-4 text-center"},U={key:1,class:"bg-green-500 text-white p-4 text-lg mb-4 text-center"},V={class:"bg-grey-lighter min-h-screen flex flex-col mb-10"},j={class:"container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-slate-300 border border-gray-700"},A={class:"bg-white px-6 py-8 rounded shadow-md text-black w-full bg-slate-200 border-spacing-2"},M=s("h1",{class:"mb-8 text-3xl text-center"},"Data Export",-1),N=s("label",{for:"age"},"Age:",-1),O=s("option",{value:""},"Select Age",-1),T=["value"],F={__name:"users_export",setup(i){const{successMessage:d,error:l,export_user:a,users_export:u,checkEmailAvailability:b,editTodo:g}=C(),r=m(Array.from({length:43},(p,e)=>e+18));return(p,e)=>(n(),c("div",null,[f(E),s("main",null,[t(l)?(n(),c("div",S,x(t(l)),1)):h("",!0),t(d)?(n(),c("div",U,x(t(d)),1)):h("",!0),s("div",V,[s("div",j,[s("div",A,[M,_(s("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>t(a).email=o),type:"text",class:"block border border-grey-light w-full p-3 rounded mb-4",name:"email",placeholder:"Email"},null,512),[[v,t(a).email]]),N,_(s("select",{"onUpdate:modelValue":e[1]||(e[1]=o=>t(a).age=o),id:"age",name:"age",class:"block border border-grey-light w-full p-3 rounded mb-4"},[O,(n(!0),c(w,null,k(r.value,o=>(n(),c("option",{value:o,key:o},x(o),9,T))),128))],512),[[y,t(a).age]]),s("button",{onClick:e[2]||(e[2]=(...o)=>t(u)&&t(u)(...o)),type:"submit",class:"w-full text-center py-3 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none my-1"},"Users Export")])])])])]))}};export{F as default};