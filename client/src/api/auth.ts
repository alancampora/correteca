type FetchAuthProps = {
  data: any;
  endpoint: string;
  successCallback: Function;
  errorCallback: Function;
};

export const fetchAuth = async ({
  data,
  endpoint,
  successCallback,
  errorCallback,
}: FetchAuthProps) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );

    if (response.ok) {
      const receivedData = await response.json();

      successCallback(receivedData);
    } else {
      const data = await response.json();
      errorCallback(data.message || "Failed to log in");
    }
  } catch (err) {
    errorCallback("An unexpected error occurred");
  }
};

type MeProps = {
  successCallback: Function;
  errorCallback: Function;
};
export const fetchMe = async ({
  successCallback,
  errorCallback,
}: MeProps): Promise<void> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      successCallback(data);
    } else {
      errorCallback();
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    errorCallback();
  }
};
