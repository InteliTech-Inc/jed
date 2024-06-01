export const sendConfirmationEmail = async (email: string) => {
  const response = await fetch("/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const data = await response.json();

  if (data.id) {
    return data;
  } else {
    throw new Error(data.message);
  }
};
