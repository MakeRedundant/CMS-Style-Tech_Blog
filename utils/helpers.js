module.exports = {
  format_date: (date) => {
    const year = new Date(date).getFullYear();
    const month = String(new Date(date).getMonth() + 1).padStart(2, '0'); // Zero-padding for month
    const day = String(new Date(date).getDate()).padStart(2, '0'); // Zero-padding for day

    // Use template literals to format the date as DD/MM/YYYY
    return `${day}/${month}/${year}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
};

//These helper functions can be used in your templates or other parts of your application to make it easier to display data in a user-friendly way.
