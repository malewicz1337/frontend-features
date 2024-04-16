const postData = async (data) => {
  try {
    const response = await fetch("https://example.com/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    console.log("Success:", jsonResponse);

  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export default postData;
