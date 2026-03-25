document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    // Grabbing the email now
    const email = document.getElementById('email').value; 
    const message = document.getElementById('message').value;
    const statusText = document.getElementById('statusMessage');

    statusText.innerText = "Sending...";

    // PASTE YOUR RENDER LINK HERE
    const API_URL = "https://my-portfolio-m5w5.onrender.com/api/feedback";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Added email to the data we are sending
            body: JSON.stringify({ name, email, message }) 
        });

        if (response.ok) {
            statusText.innerText = "Feedback sent successfully!";
            document.getElementById('feedbackForm').reset();
        } else {
            statusText.innerText = "Failed to send feedback.";
        }
    } catch (error) {
        statusText.innerText = "Error connecting to server.";
    }
});