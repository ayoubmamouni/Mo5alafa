const fileInput = document.getElementById("videoInput"); // get the file input element
const uploadVideoForm = document.getElementById("uploadVideoForm");
const loader = document.getElementById("lds-roller");
const previewVideo = document.getElementById("previewVideo");

// user info
const NumberPlate = document.getElementById("NumberPlate");
const userName = document.getElementById("userName");
const userNumber = document.getElementById("userNumber");
const userDescription = document.getElementById("userDescription");

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

  const additionalInfo = {
    NumberPlate: NumberPlate.value,
    userName: userName.value,
    userNumber: userNumber.value,
    userDescription: userDescription.value,
  };

  const data = {
    formData,
    additionalInfo,
  };

  fetch("/upload", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      uploadVideoForm.style.display = "block";
      console.log(data.msg);
      fileInput.value = "";
      NumberPlate.value = "";
      userName.value = "";
      userNumber.value = "";
      userDescription.value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
