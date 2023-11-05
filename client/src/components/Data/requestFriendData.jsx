import RequstData from "./requestData";

export default async function RequestFriendData(array) {
  try {
    const newArray = await Promise.all(
      array.map(async (element) => {
        try {
          const result = await RequstData(element);
          return result;
        } catch (error) {
          console.error("Error:", error);
          return null; // or handle the error as needed
        }
      })
    );

    // Log newArray after all promises have resolved

    // You can return newArray here or use it as needed
    return newArray;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error if needed
  }
}
