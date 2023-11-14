document.getElementById('PopUpForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const mobilePhone = document.getElementById("mobilePhone").value;
    const jobTitle = document.getElementById("jobTitle").value;
    const birthDate = document.getElementById("birthDate").value;
    if (IsValidName(name) && IsValidMobilePhone(mobilePhone) && IsValidJob(jobTitle) && IsValidBirthDate(birthDate)) {
        //input name = "id" empty, so add new contact
        if (id == '') {
            const response = await fetch("/Contact/AddContact", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    Name: name,
                    MobilePhone: mobilePhone,
                    JobTitle: jobTitle,
                    BirthDate: birthDate
                })
            });
            if (response.ok === true) {
                let newContact = await response.json();
                let rows = document.querySelector("tbody");
                rows.append(CreateRow(newContact));
                AddPopUp();
                ClearInputs();
                ClearError();
            }
            else {
                const error = await response.json();
                console.log(error.message);
            }
        }
        //input name = "id" has number value, update
        else if(IsValidId(id)){
            const response = await fetch("/Contact/UpdateContact", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    Id:parseInt(id),
                    Name: name,
                    MobilePhone: mobilePhone,
                    JobTitle: jobTitle,
                    BirthDate: birthDate
                })
            });
            if (response.ok === true) {
                let updatedContact = await response.json();
                document.querySelector(`tr[data-rowid='${updatedContact.id}']`).replaceWith(CreateRow(updatedContact));
                AddPopUp();
                console.log('q');
                ClearError();
            }
            else {
                const error = await response.json();
                console.log(error.message);
            }
        }  
    }
})
    

function ClearInputs() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("mobilePhone").value = "";
    document.getElementById("jobTitle").value = "";
    document.getElementById("birthDate").value = "";
}

//true, если аргумент является числом, false, если не является.
function IsValidId(id) {
    if (!isNaN(id))
        return true
    else {
        HandleError('Incorrect id');
        return false;
    }
   
}

//true, если есть значение
function IsValidName(name) {
    if (name !== '')
        return true;
    else {
        HandleError('Name is empty')
        return false;
    }
}

//true, если есть значение
function IsValidJob(name) {
    if (name !== '')
        return true;
    else {
        HandleError('Job title is empty')
        return false;
    }
}


//true если удовлетворяет regex
//+375 (XX) XXX-XX-XX
function IsValidMobilePhone(mobilePhone) {
    let pattern = /^\+375 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;
    if (pattern.test(mobilePhone)) {
        return true;
    }
    else {
        HandleError('Incorrect mobile phone format. +375 (XX) XXX-XX-XX');
        return false;
    }
}

//true, если текущий возраст больше 16 лет
function IsValidBirthDate(birthDate) {
    if (birthDate === '') {
        HandleError('Birth date is empty');
        return false;
    }
    let DateOfSexteenOrOlder = new Date('2008-01-01');
    let inputDate = new Date(birthDate);
    if (inputDate <= DateOfSexteenOrOlder)
        return true;
    else {
        HandleError('Incorrect Age');
        return false;
    }
}

function HandleError(errorMsg) {
    document.getElementById("displayError").innerHTML = errorMsg;
}

function ClearError() {
    document.getElementById("displayError").innerHTML = '';
}
