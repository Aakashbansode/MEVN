import{_ as h,g as m,o as p,r as w,a as s,c as d,b as t,w as u,v as _,t as l,F as k,d as f,e as v,f as b}from"./index-505dce3e.js";const x={setup(){const{state:a,GetAllTodos:n,newTodo:r,deleteTodo:o,editTodo:i}=m();return p(()=>{n()}),{state:a,GetAllTodos:n,newTodo:r,deleteTodo:o,editTodo:i}}},C={class:"justify-items-center"},A=t("h1",null,"All Todos",-1),y=t("br",null,null,-1),V=t("br",null,null,-1),g=t("br",null,null,-1),B=["onClick"],D=["onClick"];function I(a,n,r,o,i,N){const c=w("router-link");return s(),d("div",C,[A,t("button",{onClick:n[0]||(n[0]=e=>o.newTodo())},"New Todo - static"),y,u(t("input",{type:"text",placeholder:"Author","onUpdate:modelValue":n[1]||(n[1]=e=>o.state.newAuthor=e)},null,512),[[_,o.state.newAuthor]]),t("span",null," Test: "+l(o.state.newAuthor),1),V,u(t("input",{type:"text",placeholder:"Todo","onUpdate:modelValue":n[2]||(n[2]=e=>o.state.newTodoItem=e)},null,512),[[_,o.state.newTodoItem]]),t("span",null," Test: "+l(o.state.newTodoItem),1),g,(s(!0),d(k,null,f(o.state.todos,e=>(s(),d("div",{key:e._id},[v(c,{to:`/todo/${e._id}`},{default:b(()=>[t("h4",null,l(e.author),1),t("p",null,l(e.todo),1),t("button",{onClick:T=>o.editTodo(e._id)},"Edit todo",8,B)]),_:2},1032,["to"]),t("button",{onClick:T=>o.deleteTodo(e._id)},"Delete todo",8,D)]))),128))])}const F=h(x,[["render",I]]);export{F as default};