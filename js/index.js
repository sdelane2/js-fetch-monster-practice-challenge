let page = 1

const monsterFormDiv = document.querySelector("#create-monster")


// function monsterFormCreate() {
//     const monsterFormDiv = document.querySelector("#create-monster")
//     const monsterForm = document.createElement("form")

//     monsterForm.innerHTML = `
//     <input id = "name" placeholder="name...">
//     <input id = "age" placeholder="age...">
//     <input id = "description" placeholder="description...">
//     <button>Create</button>
//     `
//     monsterFormDiv.append(monsterForm)
// }

function renderNewMonForm() {
    const form = document.createElement("form")

    const nameForm = document.createElement("input")
    nameForm.type = "text"
    nameForm.name = "name"
    nameForm.value = "name"
    const ageForm = document.createElement("input")
    ageForm.type = "text"
    ageForm.name = "age"
    ageForm.value = "age"
    const descForm = document.createElement("input")
    descForm.type = "text"
    descForm.name = "description"
    descForm.value = "description"
    const submitInput = document.createElement("input")
    submitInput.type = "submit"
    submitInput.name = "submit"
    submitInput.value = "Create Monster"

    form.append(nameForm,ageForm,descForm, submitInput)
    monsterFormDiv.append(form)
    
}

renderNewMonForm()

function getMonsters(page) {
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
.then(response => response.json())
.then(data => {
    data.forEach((monster) => {
        createMonster(monster)
    })
})
}

getMonsters(page)

const forwardButton = document.querySelector("#forward")

forwardButton.addEventListener("click", event => {
    if (page >= 1) {
        getMonsters(++page)
    }
}
)

const backButton = document.querySelector("#back")

backButton.addEventListener("click", event => {
    if (page > 1) {
    getMonsters(--page)
    }
} )

const createMonDiv = document.querySelector("div#create-monster")


function createMonster(monster) {
   const monsterContainer = document.querySelector("#monster-container")
   const monsterDiv = document.createElement("div")
   monsterDiv.dataset.id = monster.id
   monsterDiv.innerHTML = `
   <h2> ${monster.name} </h2>
   <h4> ${monster.age}</h4>
   <p> ${monster.description}</p>
   `
   monsterContainer.append(monsterDiv)

}

const createButton = document.querySelector("button")

monsterFormDiv.addEventListener("submit", event =>  {
    event.preventDefault()
    

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: event.target.name.value,
            age: event.target.age.value,
            description: event.target.description.value
        }),

    } )
    .then(response => response.json())
    .then(monster => {
        console.log(monster)
    })
    .catch((error) => {
        console.error('Error:', error);
      });
    event.target.reset()
})






