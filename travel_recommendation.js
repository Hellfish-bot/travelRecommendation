// DEFINING VARIABLES
// Initialise the variables

let searchBtn = document.getElementById("btnSearch"); // The button used to search beaches, temples, or countries
let clearBtn = document.getElementById("btnClear");
let result = document.getElementById("resultContainer");
let showResult = document.getElementById("dropdown");
let close = document.getElementById("close-btn");
let query = document.getElementById("searchInput");

// CREATING THE FUNCTION FOR CLEAR THE SEARCH BOX

const clearsearch = () => {
    query.value = "";
    showResult.style.display = "none";
    console.log("Clearing");
}

// Adding en EventListener when user click the Clear button

btnClear.addEventListener("click", clearsearch)

// CREATING THE FUNCTION TO SHOWRESULT TO DISPLAY THE RESULT OF THE QUERY

const displayResult = (name, img, info) => {
    if (showResult.style.display === "none" || showResult.style.display === "") {
        showResult.style.display = "block";
    } else {
        showResult.style.display = "none";
    }
    result.innerHTML += `
        <div class="result-item">
            <h2 class="title">${name}</h2>
            <img class="search-img" src="${img}" alt="${name}">
            <p class="description>${info}</p>
        </div>
    `;
};

// FUNCTION TO CLOSE THE DROPDOWN RESULTS

const closeDropdown = () => {
    showResult.style.display = "none";
    query.value = "";
}

// Adding an EventListener when user click on the X button to close the dropdown results

close.addEventListener("click", closeDropdown);

// CREATING A FUNCTION THAT FETCH THE DATABASE AND ALSO ISPLAY AN ERROR MESSAGE IF THE QUERY FAILED TO FIND MATCHES

// This code check if the user input doesnt match with the database

const searchError = () => {
    if (showResult.style.display === "none" || showResult.style.display === "") {
        showResult.style.display = "block";
    } else {
        showResult.style.display = "none";
    }
    result.innerHTML = `<p class="notfound">Sorry we can't find your request</p>`;
};

// This code fetch through th JSON file to find matches with the user input and return the information 

fetch("travel_recommendation_api.json")
    .then((response) => {
        if(!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText); // This check the response of the network
        }
        return response.json();
    })
    .then((data) => {
        const search = () => {
            let searchQuery = query.value.toLowerCase();
            let notfound = true;
            result.innerHTML = ''; // Clear previous results

            data.countries.forEach((country) => {
                country.cities.forEach((city) => {
                    if (city.name.toLowerCase().includes(searchQuery)) {
                        showResult(city.name, city.imageUrl, city.description);
                        notfound = false;
                    }
                });
            });

            data.temples.forEach((temple) => {
                if (temple.name.toLowerCase().includes(searchQuery)) {
                    showResult(temple.name, temple.imageUrl, temple.description);
                    notfound = false;
                }
            });

            data.beaches.forEach((beach) => {
                if (beach.name.toLowerCase().includes(searchQuery)) {
                    showResult(beach.name, beach.imageUrl, beach.description);
                    notfound =  false;
                }
            });

            if (notfound) {
                searchError();
            }
        };

        btnSearch.addEventListener("click", search);
    })

    // This code display a message if there is a problem with the fetch operation

    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });