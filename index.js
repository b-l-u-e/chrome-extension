const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const inputEl = document.getElementById("input-el");

const ulEl = document.getElementById("ul-el");

let myLeads = [];

let tabs = [
    {
        url: "https://www.linkedin.com/in/abhishek-kumar-7b7b3b1b7/",
    }
]

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);

}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a href='${leads[i]}' target='_blank'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", () => {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads);
});

tabBtn.addEventListener("click", () => {
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       myLeads.push(tabs[0].url);
       localStorage.setItem("myLeads", JSON.stringify(myLeads))
       render(myLeads);
   })

    console.log(tabs[0].url);
})

deleteBtn.addEventListener("click", () => {
    localStorage.clear();
    // if(localStorage.length === 0) {
    //     ulEl.innerHTML = "";
    // }

    myLeads = [];
    render(myLeads);
})
