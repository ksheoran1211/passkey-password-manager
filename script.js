function maskPassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str += "*"
    }
    return str
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            alert("Copied! " + txt);
            //document.querySelector(".alert").classList.remove("alert")
        },
        () => {
            alert("Clipboard copying failed: ");
        }
    )
}

const deletePassword = (website) => {
    let data = localStorage.getItem("Passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e)=>{
        return e.website != website
    })
    localStorage.setItem("Passwords", JSON.stringify(arrUpdated))
    alert(`Successfully deleted ${website}'s password`)
    showPassowrds()
}
const showPassowrds = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("Passwords")
    if (data == null) {
        tb.innerHTML = "No Data To Show"
    }
    else {
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>`
        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
    <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
    <td>${element.Username} <img onclick="copyText('${element.Username}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
    <td>${maskPassword(element.Password)} <img onclick="copyText('${element.Password}')"  src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
    <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
    </tr>`
        }
        tb.innerHTML = tb.innerHTML + str
    }
    website.value = ""
    Username.value = ""
    Password.value = ""
}
console.log("Workiing");
showPassowrds()
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Clicked..")
    console.log(Username.value, Password.value)
    let Passwords = localStorage.getItem("Passwords")
    console.log(Passwords)
    if (Passwords == null) {
        let json = []
        json.push({ website: website.value, Username: Username.value, Password: Password.value })
        alert("Password Saved")
        localStorage.setItem("Passwords", JSON.stringify(json))

    }
    else {
        let json = JSON.parse(localStorage.getItem("Passwords"))
        json.push({ website: website.value, Username: Username.value, Password: Password.value })
        alert("Password Saved")
        localStorage.setItem("Passwords", JSON.stringify(json))
    }
    showPassowrds()
})