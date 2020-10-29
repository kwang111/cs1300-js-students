var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=S_xqkO1wsExK-UUQAWLc7FqMQgX2z1OyNTWTZpkJijY";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      handleResponse(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
const displayDiv = (content) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrapper");
  const header = document.createElement("h1");
  header.innerText = content;
  wrapper.appendChild(header);
  document.getElementById("plants").appendChild(wrapper);
}

const handleResponse = (requestResponse) => {
  const jsonified = JSON.parse(requestResponse);
  const plantArray = jsonified.data;

  console.log(plantArray);

  const filteredPlants = plantArray.filter((arrayItem) => {
    return arrayItem.family_common_name == "Rose family";
  })

console.log(filteredPlants);

filteredPlants.map((plant)=>{
  const wrapper = document.createElement("div");
  const name = document.createElement("h2");
  const image = document.createElement("img");
  image.setAttribute("src", plant.image_url);
  wrapper.setAttribute("margin", "5%");
  name.innerText = plant.common_name;
  wrapper.appendChild(name);
  wrapper.appendChild(image);
  document.getElementById("plants").appendChild(wrapper);
});

}

/*  plantsAfter1753.map(console.log) */

/* const handleResponse = (requestResponse) => {
  const jsonified = JSON.parse(requestResponse);
  const plantsArray = jsonified.data;

  const plantsAfter1753 = plantsArray.filter((arrayItem) => {
    return arrayItem.year > 1753;
  })

  plantsAfter1753.map(console.log)
}
 */