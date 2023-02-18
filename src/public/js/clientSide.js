const fileInput = document.getElementById("videoInput"); // get the file input element
const uploadVideoForm = document.getElementById("uploadVideoForm");
const loader = document.getElementById("lds-roller");
const previewVideo = document.getElementById("previewVideo");
fileInput.onchange = (e) => {
  previewVideo.style.display = "block";
  let file = e.target.files[0];
  let blobURL = URL.createObjectURL(file);
  previewVideo.src = blobURL;
};

uploadVideoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = fileInput.files[0]; // get the selected file

  if (file.size > 20 * 1024 * 1024) {
    // check if the file size is greater than 20MB
    console.log(
      "File size exceeds the limit, The video size should be less than 20Mb"
    );
    return;
  }

  loader.style.display = "inline-block";
  uploadVideoForm.style.display = "none";

  const formData = new FormData(); // create a new FormData object
  formData.append("video", file); // add the file to the form data

  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      uploadVideoForm.style.display = "block";
      console.log(data.msg);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
