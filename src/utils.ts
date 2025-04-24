export const   validateInput = (value: string) => {
      const regex = /^[A-Za-z0-9 ]+$/; 
      if (value.trim() === "") {
        return "Field cannot be empty";
      } else if (!regex.test(value)) {
        return "Only Alphabet and digits are allowed"; 
      } else {
        return "";
      }
    };