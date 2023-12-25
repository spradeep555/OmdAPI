function searchMovie() {
    let apiKey = "b41c1a63"; 
    let movieName = document.getElementById("movieInput").value;

    if (movieName.trim() === "") {
        alert("Please enter a movie name.");
        return;
    }

    let apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieName)}`;

    fetch(apiUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            displayData(data);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
        });
}

function displayData(data) {
    let movieImageContainer = document.getElementById("movieImage");
    let movieDataContainer = document.getElementById("movieData");

    movieImageContainer.innerHTML = "";
    movieDataContainer.innerHTML = "";

    if (data.Poster) {
        let img = document.createElement("img");
        img.src = data.Poster;
        img.onload = function () {
            let imageHeight = this.height;

            if (imageHeight > 200) {
                movieImageContainer.style.width = "300px";
                movieDataContainer.style.width = "500px";
            } else {
                movieImageContainer.style.width = "150px";
                movieDataContainer.style.width = "500px";
            }

            movieImageContainer.appendChild(img);
        };
    }

    let detailsToShow = ["Title", "Year", "Genre", "Plot", "Director", "Actors","Director","Rated"];

    detailsToShow.forEach(function (key) {
        let p = document.createElement("p");
        p.textContent = `${key}: ${data[key] || "N/A"}`;
        movieDataContainer.appendChild(p);
    });
}


  