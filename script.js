
document.getElementById("male-table").style.display = "none";
document.getElementById("female-table").style.display = "none";
document.getElementsByClassName("table-header")[0].style.display = "none";
document.getElementsByClassName("table-header")[1].style.display = "none";

function load_data(data,table_id) {
    document.getElementById(table_id).innerHTML = "";
    html = `
    <tr class="scroll-div">
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Mark</th>
                <th>Passing</th>
                <th>Email</th>
            </tr>
    `;
    for (let i = 0; i < data.length; i++) {
        html += `
        <tr>
                <td>${data[i].id}</td>
                <td><img src="${data[i].img_src}" alt="Avatar" class="avatar">${data[i].first_name} ${data[i].last_name}</td>
                <td>${data[i].gender}</td>
                <td>${data[i].class}</td>
                <td>${data[i].marks}</td>
                <td>${data[i].passing ? "Passing" : "Failed"}</td>
                <td>${data[i].email}</td>
            </tr>
        `
    }
    document.getElementById(table_id).innerHTML = html;
}

async function show_data(sort_by_name = 0, sort_by_marks = false, sort_by_passing = false, sort_by_class = false, search_text = "") {
    const response = await fetch('./MOCK_DATA.json');
    let json = await response.json();

    if (search_text !== "") {
        json = json.filter(function (a) {
            return a.first_name.toLowerCase().includes(search_text) || a.last_name.toLowerCase().includes(search_text) || a.email.toLowerCase().includes(search_text);
        });
    } else {

        if (sort_by_name === 1) {
            json.sort(function (a, b) {
                return a.first_name.localeCompare(b.first_name);
            });
        } else if (sort_by_name === 2) {
            json.sort(function (a, b) {
                return b.first_name.localeCompare(a.first_name);
            });
        }
        if (sort_by_marks === true) {
            json.sort(function (a, b) {
                return parseFloat(a.marks) - parseFloat(b.marks);
            });

        }
        if (sort_by_passing === true) {
            json = json.filter(function (a) {
                return a.passing == true;
            });
        }
        if (sort_by_class === true) {
            json.sort(function (a, b) {
                return parseFloat(a.class) - parseFloat(b.class);
            });
        }
    }
    load_data(json,"table");
}


function search(e) {
    let search_text = e.value.toLowerCase();
    show_data(sort_by_name = 0, sort_by_marks = false, sort_by_passing = false, sort_by_class = false, search_text = search_text);
}


show_data(sort_by_name = 0, sort_by_marks = false, sort_by_passing = false, sort_by_class = false);

async function gender(){
    document.getElementById("table").style.display = "none";

    const response = await fetch('./MOCK_DATA.json');
    let json = await response.json();

        male_json = json.filter(function (a) {
            return a.gender == "Male";
        });
        female_json = json.filter(function (a) {
            return a.gender == "Female";
        });

        console.log(female_json)

        load_data(male_json,"male-table");
        load_data(female_json,"female-table");
        

    document.getElementById("male-table").style.display ="table";
    document.getElementById("female-table").style.display = "table";
    document.getElementsByClassName("table-header")[0].style.display = "block";
document.getElementsByClassName("table-header")[1].style.display = "block";
}