({723:function(){(()=>{this.current=0,this.showDetails=e=>{const t=e.currentTarget.dataset.id;this.current&&(document.querySelector(`.avatar${this.current}`).classList.remove("selected"),document.querySelector(`#avatar${this.current}-classes`).style.display="none"),this.current=t,document.querySelector(`.avatar${this.current}`).classList.add("selected"),document.querySelector(`#avatar${this.current}-classes`).style.display="flex"},this.deselectAllClasses=()=>{const e=document.getElementsByClassName("class");for(let t=0;t<e.length;t++)e[t].classList.remove("active")},this.selectClass=e=>{this.deselectAllClasses(),e.currentTarget.classList.add("active")};const e=document.getElementsByClassName("avatar");for(let t=0;t<e.length;t++)e[t].addEventListener("click",this.showDetails);const t=document.getElementsByClassName("class");for(let e=0;e<t.length;e++)t[e].addEventListener("click",this.selectClass)})()}})[723]();