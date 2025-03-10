const API = '/api/v2';

var state = {
    file: null,
    history: {},
    render: null,
}

function dragOverHandler(event) {
    event.preventDefault();

    // Change the style of the drop area
    document.getElementById("display").classList.add("fileover");
}

function dragLeaveHandler(event) {
    event.preventDefault();

    // Change the style of the drop area
    document.getElementById("display").classList.remove("fileover");
}

function openFile() {
    // Open file dialog to pick a image file
    document.getElementById("file-input").click();
}

function loadFile(event) {
    document.getElementById("display").classList.add("loading");

    state.history = {};
    state.file = event.target.files[0];

    renderPreview();
}

function dropHandler(event) {
    document.getElementById("display").classList.remove("fileover");
    document.getElementById("display").classList.add("loading");

    event.preventDefault();
    state.history = {};
    state.file = event.dataTransfer.files[0];

    renderPreview();
}

function renderPreview() {
    document.getElementById("display").classList.add("loading");

    // Send image file to server to generate preview with options
    // Encode image as base64 string
    let request = new XMLHttpRequest();
    request.open("POST", API + "/misc/render_loom_file    ", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            let data = JSON.parse(request.responseText);

            console.log(data);

            const img_el = document.getElementById("preview");

            state.render = `data:image/png;base64,${data}`;

            img_el.style.backgroundImage = `url(${state.render})`;

            document.getElementById("display").classList.remove("loading");
            document.getElementById("display").classList.add("preview");
        } else {
            // We reached our target server, but it returned an error
            uploadError(request);
            console.log("Error");
        }
    }

    request.onerror = function () {
        // There was a connection error of some sort
        uploadError({responseText: "Internal Server Error"});
        console.log("Error");
    }

    // Decode image file as base64 string
    let reader = new FileReader();
    reader.readAsDataURL(state.file);
    reader.onload = function () {
        let file_data_base64 = reader.result.split(',')[1];


        let data = {
            file: file_data_base64,
            extension: state.file.name.split('.').pop(),
            output_format: "png",
            desired_width: Number(document.getElementById("desired-width").value),
            loom_width: Number(document.getElementById("loom-width").value),
            invert: document.getElementById("invert").checked,
            tabby_width: Number(document.getElementById("tabby-width").value),
        }

        request.send(JSON.stringify(data));
        console.log("Sent");
    };
}

function uploadError(request) {
    document.getElementById("display").classList.remove("loading");
    alert("Error uploading file: " + request.responseText);
}

function downloadCurrentRender() {
    // Download current render
    const link = document.createElement("a");
    let timestamp = new Date().getTime();
    link.download = `loom-${timestamp}.tiff`;
    link.href = state.render;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById("tabby-width").addEventListener("change", function () {
    // Ensure min/max values are respected
    let value = Number(document.getElementById("tabby-width").value);
    if (value < 7) {
        document.getElementById("tabby-width").value = 7;
    }
});