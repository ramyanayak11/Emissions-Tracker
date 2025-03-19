let cropper;

document.getElementById('uploadImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('crop-image').src = e.target.result;
            document.getElementById('image-crop-container').style.display = 'block';
            
            if (cropper) {
                cropper.destroy();
            }
            
            const image = document.getElementById('crop-image');
            cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                background: false,
                zoomable: false
            });
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('crop-btn').addEventListener('click', function() {
    const canvas = cropper.getCroppedCanvas({ width: 100, height: 100 });
    document.getElementById('profilePic').src = canvas.toDataURL();
    document.getElementById('image-crop-container').style.display = 'none';
});

function showToast(message) {
    let toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// logic for back button on top left
function goBack() {
    window.history.back();
}

// logic for sign out button on top right
function signOut() {
    alert("Signing out...");
    // ------ insert actual sign out logic here ------
}
