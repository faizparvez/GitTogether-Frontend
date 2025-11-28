export const validation = {
  firstName: (value) => {
    if (!value || value.trim().length === 0) return "First name is required";
    if (value.length > 20) return "First name must be 20 characters or less";
    return null;
  },
  lastName: (value) => {
    if (!value || value.trim().length === 0) return "Last name is required";
    if (value.length > 20) return "Last name must be 20 characters or less";
    return null;
  },
  age: (value) => {
    if (value && value < 18) return "You must be at least 18 years old";
    return null;
  },
  about: (value) => {
    if (value && value.length > 500)
      return "About section must be 500 characters or less";
    return null;
  },
  location: (value) => {
    if (value && value.length > 100)
      return "Location must be 100 characters or less";
    return null;
  },
  skills: (value) => {
    if (value && value.length > 20) return "You can select up to 20 skills";
    return null;
  },
  interests: (value) => {
    if (value && value.length > 10) return "You can select up to 10 interests";
    return null;
  },
};
