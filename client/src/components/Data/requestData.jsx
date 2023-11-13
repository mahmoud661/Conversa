export default async function RequstData(searchInput) {
    try {
      const response = await fetch("https://conversa-backend-up11.onrender.com/usersData", {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: searchInput,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Error sending email");
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error:", error);
    }
  };