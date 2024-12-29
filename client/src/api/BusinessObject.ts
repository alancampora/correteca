import { BusinessObject } from "@common/BusinessObject";

export const fetchBusinessObjects = async (): Promise<BusinessObject[]> => {
  const response = await fetch("http://localhost:3000/api/business-objects");
  if (!response.ok) {
    throw new Error("Failed to fetch BusinessObjects");
  }
  return response.json();
};
