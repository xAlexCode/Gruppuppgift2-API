document.getElementById("register-form").addEventListener("submit", async function (event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(API_URL + "/auth/register", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {

            document.getElementById("register-message").className =
                "alert alert-success";

            document.getElementById("register-message").textContent =
                data.message;

        } else {

            document.getElementById("register-message").className =
                "alert alert-danger";

            document.getElementById("register-message").textContent =
                data.message;

        }

    } catch (error) {

        console.error("Error:", error);

    }

});