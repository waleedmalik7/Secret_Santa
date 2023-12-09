const name_count = document.querySelector("#names");
const form_count = document.querySelector(".first-form");
const title_container = document.querySelector(".title-container");
const image = title_container.querySelector('img');
const form_container_2 = document.querySelector(".form-container-2");
const regex = /^([1-9]|[1-2]\d)$/; //TBD

let data = {};
let names = [];

form_count.addEventListener("submit",async (e)=>{
    e.preventDefault();

    changePage();
    
    const new_form = document.createElement("form");
    const submit = document.createElement("input");

    submit.setAttribute("type","submit");
    submit.setAttribute("value","Submit");

    form_container_2.append(new_form);
    const number_of_names = Number(name_count.value);

    for(let i = 1; i < number_of_names + 1 ; i++){
        console.log(i);
        const new_name = document.createElement("input");
        new_name.setAttribute("id",`name-${i}`);
        new_name.setAttribute("placeholder", `name ${i}`);
        new_name.setAttribute("type","text");

        const new_email = document.createElement("input");
        new_email.setAttribute("id",`email-${i}`);
        new_email.setAttribute("placeholder", `email ${i}`);
        new_email.setAttribute("type","text");

        new_form.append(new_name);
        new_form.append(new_email);
    }
    new_form.append(submit);

    new_form.addEventListener("submit", (e)=> {
        e.preventDefault();
        createData(new_form);
    });
});

const changePage = () =>{
    name_count.style.display = 'none';
    form_count.style.display = 'none';
    image.style.width = '200px';
};



const createData = async (form)=>{
    const inputs = form.querySelectorAll("input");
    const values = Array.from(inputs).slice(0,-1);
    for(let i = 0; i < values.length; i += 2){
        // data.push([values[i].value,values[i+1].value]);
        data[values[i].value] = {email: values[i+1].value};
        names.push(values[i].value);
    }
    console.log(names);
    randomizeData();
    console.log(names);
    randomizeData();
    console.log(names);
    randomizeData();
    addPartners();
    console.log(names);
    console.log(data);
    await postInfo();
};

//Fisher yates algorithm / Knuth swapping algorithm
const randomizeData = () => {
    for(let pointer = 0; pointer < names.length - 1; pointer++){
        let random_index = Math.floor(Math.random() * (names.length - pointer)) + pointer;
        console.log(`swapping ${names[pointer]} with ${names[random_index]}`);
        [names[pointer],names[random_index]] = [names[random_index],names[pointer]];
    }
};

const addPartners = () => {
    for(let i = 0; i < names.length; i++){
        let partner_index = (i + 1) % names.length;
        data[names[i]]["partner"] = names[partner_index];
    }
};

const postInfo = async () => {
    const jsonData = JSON.stringify(data);
    fetch('/email', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: jsonData
    })
}