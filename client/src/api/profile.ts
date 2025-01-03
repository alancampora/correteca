import { IUser } from "@common/User";

type UpdateProfileProps = {
  data: any;
  userId: string;
  successCallback: Function;
  errorCallback: Function;
};
export const updateProfile = async ({
  data,
  userId,
  successCallback,
  errorCallback,
}: UpdateProfileProps) => {
  try {
    console.log("user data", { data });
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    successCallback();
  } catch (error) {
    console.error(error);
    errorCallback();
  }
};
