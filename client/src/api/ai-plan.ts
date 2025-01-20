type GenerateAIPlan = {
  data: any;
  successCallback: Function;
  errorCallback: Function;
};

export const getGenerateAIPlan = async ({
  data,
  successCallback,
  errorCallback,
}: GenerateAIPlan) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/ai-plan/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to generate your Running plan");
    }

    const plan = await response.json();

    successCallback(plan);
  } catch (error) {
    console.error(error);
    errorCallback();
  }
};
