const posts = document.querySelector(".posts");
const imageTemplate = document.getElementById("single-post");
const imageList = document.querySelector("ul");

function sendHttpRequest(method, url) {
  return fetch(url, { method: method }).then((response) => {
    return response.json();
  });
}

async function fetchImage() {
  try {
    const responseData = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/photos"
    );

    const listOfImage = responseData;
    for (const image of listOfImage) {
      const imageEle = document.importNode(imageTemplate.content, true);
      imageEle.querySelector("h2").textContent = image.title.toUpperCase();
      imageEle.querySelector("img").src = image.url;
      imageEle.querySelector("img").alt = image.id;
      imageEle.querySelector("li").id = image.id;
      posts.append(imageEle);
    }
  } catch (error) {
    console.log(error.message);
  }
  document.querySelector(".spinner").style.display = "none"; //stop the load
}

fetchImage();

//delete request
imageList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const imageId = e.target.closest("li").id;
    console.log(imageId);
    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/photos${imageId}`
    );

    // Delete the imageId from the UI
    const li = document.getElementById(imageId);
    li.remove();
  }
});
