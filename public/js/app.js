const search = document.querySelector("input");
const weatherForm = document.querySelector("form");
const message = document.querySelector("#data");
const errorMsg = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);
  fetch("/weather?place=" + search.value)
    .then((res) => {
      console.log(res);
      if (res.error) {
        return (errorMsg.textContent = "error in fetching data");
      }
      return res.json();
    })
    .then((json) => {
      console.log(json);
      if (json.error) {
        return (
          (errorMsg.textContent = "Location not found !!!"),
          (message.textContent = "")
        );
      }
      message.textContent =
        "Location is " +
        json.location +
        ". Longitude is: " +
        json.longitude +
        ". Latitude is: " +
        json.latitude;
      errorMsg.textContent = "";
    })
    .catch(error);
});
