
async function GetContacts() {
    console.log('GetContacts executed');
    const response = await fetch("/Contact/GetData", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    if (response.ok === true) {
        let contacts = await response.json();
        let rows = document.querySelector("tbody");
        contacts.forEach(contact => rows.append(CreateRow(contact)));
        AddPopUp();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
};

async function getContactById(id) {
    const response = await fetch(`/Contact/GetContactData/${id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    });
    if (response.ok) {
        let activeContact = await response.json();
        document.getElementById("id").value = activeContact.id;
        document.getElementById("name").value = activeContact.name;
        document.getElementById("mobilePhone").value = activeContact.mobilePhone;
        document.getElementById("jobTitle").value = activeContact.jobTitle;
        document.getElementById("birthDate").value = ConvertDate(activeContact.birthDate);
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

async function DeleteContact(id) {
    const response = await fetch(
        `/Contact/DeleteContact/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json"
        },
    });
    if (response.ok) {
        document.querySelector(`tr[data-rowid='${id}']`).remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

function CreateRow(contact) {
    console.log('CreateRow executed');

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", contact.id);

    const nameTD = document.createElement("td");
    nameTD.innerHTML = contact.name;
    tr.append(nameTD);

    const MobilePhoneTD = document.createElement("td");
    MobilePhoneTD.innerHTML = contact.mobilePhone;
    tr.append(MobilePhoneTD);

    const JobTitleTD = document.createElement("td");
    JobTitleTD.innerHTML = contact.jobTitle;
    tr.append(JobTitleTD);

    const BirthDateTD = document.createElement("td");
    BirthDateTD.innerHTML = ConvertDate(contact.birthDate);
    tr.append(BirthDateTD);

    const linksTD = document.createElement("td");

    let editLink = document.createElement("a");
    editLink.append("Edit...");
    editLink.href = "#";
    editLink.classList.add("open-popup")
    editLink.addEventListener("click", async () => {
        getContactById(contact.id);
    })
    linksTD.append(editLink);

    let removeLink = document.createElement("button");
    removeLink.append("Delete");
    removeLink.classList.add("delete-button");
    removeLink.addEventListener("click", async () => {
        await DeleteContact(contact.id);
    })
    linksTD.append(removeLink);
    tr.append(linksTD);

    return tr;
};

function ConvertDate(birthDate) {
    const date = new Date(birthDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

GetContacts();