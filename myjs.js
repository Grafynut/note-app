

const d = new Date();

let Day = d.getDay();
let dayname = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let todayname = dayname[Day];

let month = d.getMonth();
let year = d.getFullYear();

let displaydate = `${todayname} ${month},${year}`


const addBtn = document.querySelector('#add-note');

const updateLsData = () => {
    const textareaData = document.querySelectorAll('.text-area');
    const notes = [];

    textareaData.forEach((note) => {
        if (note.value != 0) {
            return notes.push(note.value);
        }
    })

    localStorage.setItem('notes', JSON.stringify(notes));

}

//date set in localhost

// const datefunc = () => {
//     // const date = document.getElementById('Date');
//     // const dates = [];

//     // date.forEach((note) => {
//     //     if (note.value != 0) {
//     //         return dates.push(date.innerHTML);
//     //     }
//     //     else {
//     //         console.log('ok');
//     //     }
//     // })


//     localStorage.setItem('dates', 'hello');
// }




const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
        <div class="operations">
            <button class="save"><i class="fa-solid fa-floppy-disk"></i></button>
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
            <button id="menu"><i class="fa-solid fa-ellipsis-vertical"></i></button>
        </div>

    <div class="text-area-inner">
    <div class="main ${text ? " " : "hidden"}"></div>
        <textarea type="text" class="text-area ${text ? "hidden" : " "}"></textarea>
    </div>
    `;
    // <div id="Date">${displaydate}</div>

    // note.insertAdjacentElement('afterbegin',htmlData);
    note.insertAdjacentHTML('afterbegin', htmlData);

    //referaneces 
    const saveBtn = note.querySelector('.save');
    const editBdn = note.querySelector('.edit');
    const deleteBdn = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('.text-area');
    const menu = note.querySelector('#menu');
    var echoD = document.getElementById('echoD');
    const Date = note.querySelector('#Date');



    //show options


    // deleting note
    deleteBdn.addEventListener('click', () => {
        note.remove();
        location.reload();
        setTimeout(() => {
            echoD.classList.add('echo-animation');
            echoD.innerHTML = `Deleted`;
        }, 0)
        echoD.classList.remove('echo-animation');
        updateLsData();

    })

    textarea.value = text;
    mainDiv.innerHTML = text;

    function hideicon() {
        saveBtn.classList.toggle('d-block');
        deleteBdn.classList.toggle('d-block');
        editBdn.classList.toggle('d-block');
    }

    menu.addEventListener('click', () => {
        hideicon();
    })


    function saved() {
        mainDiv.classList.remove('hidden');
        textarea.classList.add('hidden');
        setTimeout(() => {
            echoD.classList.add('echo-animation');
            echoD.innerHTML = `Saved`;
        }, 0)
        echoD.classList.remove('echo-animation');
    }
    //toggle text
    saveBtn.addEventListener('click', () => {
        saved();
        hideicon();
    })

    var noteBack = document.querySelector('.note-back');

    noteBack.addEventListener('click', () => {
        mainDiv.classList.remove('hidden');
        textarea.classList.add('hidden');
    })

    editBdn.addEventListener('click', () => {
        mainDiv.classList.add('hidden');
        textarea.classList.remove('hidden');
        hideicon();
    })

    // showmenu();

    //data get and save
    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLsData();
    })



    const addT = document.querySelector('.addT');

    function addt() {
        let x = document.getElementById('body')
        if (x.childElementCount >= 2) {
            addT.style.opacity = "0";
        } else {
            addT.style.opacity = "1";
        }
    }
    addt();

    const bodyarea = document.querySelector('#body');
    bodyarea.appendChild(note);


}

// getting data from local storage
var notes = JSON.parse(localStorage.getItem('notes'));

// var notes = JSON.parse(localStorage.getItem('dates'));


if (notes) { notes.forEach((note) => addNewNote(note)) }

addBtn.addEventListener('click', () => {
    addNewNote();
    datefunc();
});

var mainDivText = document.querySelectorAll('.main');

let search = document.getElementById('search');

search.addEventListener('input', () => {
    let inputVal = search.value.toUpperCase();

    let mainDiv = document.querySelectorAll('.note');

    Array.from(mainDiv).forEach(function (element) {
        let DivTxt = element.getElementsByClassName('main')[0].innerHTML.toUpperCase();

        if (DivTxt.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = "none";

        }
    })
})
// let notelen = document.querySelectorAll('.note');
// let bodyarea = document.querySelector('#body');

// var x = document.querySelector('.delete');

// x.addEventListener('click', () => {
//     location.reload();
// });

