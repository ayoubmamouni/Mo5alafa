const fileInput = document.getElementById("videoInput"); // get the file input element
const uploadButton = document.getElementById("uploadButton"); // get the upload button element
const spinner = document.getElementById("spinner");

uploadButton.addEventListener("click", () => {
  const file = fileInput.files[0]; // get the selected file

  if (file.size > 20 * 1024 * 1024) {
    // check if the file size is greater than 20MB
    console.log(
      "File size exceeds the limit, The video size should be less than 20Mb"
    );
    return;
  }

  spinner.style.display = "block"; // show the spinner

  const formData = new FormData(); // create a new FormData object
  formData.append("video", file); // add the file to the form data

  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      spinner.style.display = "none";
      console.log(data.msg);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
