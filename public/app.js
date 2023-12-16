const name_count = document.querySelector("#names");
const form_count = document.querySelector(".first-form");
const title_container = document.querySelector(".title-container");
const image = title_container.querySelector('#mainImage');
const form_container_2 = document.querySelector(".form-container-2");
const backImage = document.querySelector('#backImage');
const response_container = document.querySelector('.response-container');

const regex = /^([1-9]|[1-2]\d)$/; //regex for first input, we dont want too many names/emails

let data = {};
let names = [];

const response = document.createElement('div');

form_count.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const new_form = document.createElement("form");
    changePage(new_form);

    const input_container = document.createElement("div");
    const submit = document.createElement("input");

    input_container.setAttribute("class","input-container");

    submit.setAttribute("type","submit");
    submit.setAttribute('class',"submit");
    submit.setAttribute("value","Send Emails");

    
    const number_of_names = Number(name_count.value);

    for(let i = 1; i < number_of_names + 1 ; i++){
        const new_name = document.createElement("input");
        new_name.setAttribute("id",`name-${i}`);
        new_name.setAttribute("placeholder", `Name ${i}`);
        new_name.setAttribute("type","text");
        new_name.setAttribute("autocomplete","off");
        new_name.setAttribute('required', 'true');

        const new_email = document.createElement("input");
        new_email.setAttribute("id",`email-${i}`);
        new_email.setAttribute("placeholder", `Email ${i}`);
        new_email.setAttribute("type","text");
        new_email.setAttribute("autocomplete","off");
        new_email.setAttribute('required', 'true');

        input_container.append(new_name);
        input_container.append(new_email);
    }
    new_form.append(input_container);
    new_form.append(submit);
    form_container_2.append(new_form);
    

    new_form.addEventListener("submit", async (e)=> {
        e.preventDefault();
        const status = await createData(input_container);
        const submit = document.querySelector('.submit');
        console.log(status);
        if(status == 200){
            response.innerText = "Congrats! Emails have been successfully sent";
            response.setAttribute('class','success');
        }else{
            response.innerText = "Error! Emails fail to send. Please try again";
            response.setAttribute('class','fail');
        }
        submit.style.pointerEvents = 'none';
        response_container.append(response);
    });
});

const changePage = (new_form) =>{
    name_count.style.display = 'none';
    form_count.style.display = 'none';
    image.style.width = '200px';
    backImage.style.display = 'block';

    backImage.addEventListener('click', ()=>{
        name_count.style.display = 'block';
        name_count.value = '';
        form_count.style.display = 'block';
        image.style.width = '400px';
        backImage.style.display = 'none';
        response.remove();
        data = {};
        names = [];
        new_form.remove();
    })
};

const createData = async (form)=>{
    const inputs = form.querySelectorAll("input");
    const values = Array.from(inputs);
    for(let i = 0; i < values.length; i += 2){
        data[values[i].value] = {email: values[i+1].value};
        names.push(values[i].value);
    }
    //randomize 3 times, because we want to ensure randomness

    randomizeData();
    randomizeData();
    randomizeData();
    
    addPartners();

    const response = await postInfo();
    const value = await response.status;
    return Number(value);
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
    const response = await fetch('/email', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: jsonData
    })
    return response;
}