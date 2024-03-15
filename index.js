const saveEl = document.getElementById("save-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const delEl =document.getElementById("del-btn")
const saveTabEl = document.getElementById("save-tab")
const localLeads = JSON.parse(localStorage.getItem("myLeads"))
let myLeads = []
if (localLeads) {
    myLeads = localLeads
    renderLeads()
}
function renderLeads(){
    let leadshtml =""
    for(let i=0;i<myLeads.length;i++){
        leadshtml += `<li>
        <a target='_blank' href = '${myLeads[i]}' > 
        ${myLeads[i]}
        </a>
        </li>`
    }
    ulEl.innerHTML = leadshtml
}
saveEl.addEventListener("click",
    function save() {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads()
    }
)
delEl.addEventListener("dblclick",
    function deletee(){
        localStorage.clear()
        myLeads = []
        renderLeads() 
    }
)
saveTabEl.addEventListener("click",
    function saveTab(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            renderLeads()
        })
    }
)