function submitForm() {
    var form = document.getElementById('contactForm');
    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://formspree.io/f/your_form_id');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            alert('Your message has been sent successfully!');
            form.reset(); // Clear form fields after successful submission if needed
        } else {
            alert('Oops, something went wrong. Please try again later.');
        }
    };
    xhr.send(formData);
}
