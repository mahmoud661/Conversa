export default async function Sendmessage(userEmail, friendEmail , message) {
    console.log(message.content)
  try { 
    const response = await fetch("https://conversa-backend-up11.onrender.com/sendmessage", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        yourEmail: userEmail,
        friendEmail: friendEmail, 
        message:message,
      }),
    });

    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      console.error("Error sending email");
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}
