const name_count = document.querySelector("#names");
const form_count = document.querySelector(".first-form");
const form_container_2 = document.querySelector(".form-container-2");
let data = [];
let names = [];

form_count.addEventListener("submit",(e)=>{
    e.preventDefault();
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
        randomizeData();
    });

});

const createData = (form)=>{
    const inputs = form.querySelectorAll("input");
    const values = Array.from(inputs).slice(0,-1);
    for(let i = 0; i < values.length; i += 2){
        data.push([values[i].value,values[i+1].value]);
        names.push(values[i].value);
    }
};

const randomizeData = ()=>{
    for(let i = 0; i < data.length; i++){
        let copy = names.slice();
        copy.splice(i,1);
        shuffleArray(copy);
        shuffleArray(copy);
        shuffleArray(copy);
        let value = copy[0];
        for(let j = 0; j < names.length; j++){
            if (value == names[j]){
                names.splice(j,1);
            }
        }
        console.log(data[i][0] + " bought for " + value);
        
    }
};

const shuffleArray = (array)=>{
    for(let i = 0; i < array.length - 1; i++){
        const j = i + Math.floor(Math.random() * (array.length - i));
        [array[i], array[j]] = [array[j], array[i]];
    }
}






