// Function to upload CSV file
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('csvFile', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload', true);

        // Progress indicator
        xhr.upload.onprogress = function(event) {
            const progressBar = document.getElementById('progressBar');
            progressBar.innerHTML = '<div style="width: ' + (event.loaded / event.total) * 100 + '%"></div>';
        };

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    displayData(response.data);
                } else {
                    console.error('Error:', xhr.status);
                }
            }
        };

        xhr.send(formData);
    }
}

// Function to display uploaded data
function displayData(data) {
    const dataTable = document.getElementById('dataTable');
    // Clear previous data
    dataTable.innerHTML = '';
    // Add table headers
    const headerRow = dataTable.insertRow();
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    // Add table rows
    data.forEach(item => {
        const row = dataTable.insertRow();
        Object.values(item).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });
}

// Function to calculate subscription pricing
document.getElementById('pricingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const creditScore = parseInt(document.getElementById('creditScore').value);
    const creditLines = parseInt(document.getElementById('creditLines').value);
    if (!isNaN(creditScore) && !isNaN(creditLines)) {
        const formData = new FormData();
        formData.append('creditScore', creditScore);
        formData.append('creditLines', creditLines);
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/calculate-pricing', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    document.getElementById('pricingResult').textContent = `Subscription Price: $${response.subscriptionPrice}`;
                } else {
                    console.error('Error:', xhr.status);
                }
            }
        };

        xhr.send(JSON.stringify({ creditScore, creditLines }));
    }
});
