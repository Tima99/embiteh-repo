function serializeForm(data) {
  const formData = new FormData();

  console.log(data);
  // Iterate over the properties of the data object
  Object.entries(data).forEach(([key, value]) => {
    // If the value is an array, append each element separately
    if (Array.isArray(value)) {
      value.forEach((element) => {
        formData.append(`${key}`, element);
      });
    } else if (value instanceof FileList) {
      [...value].forEach((element) => {
        formData.append(`${key}`, element);
      });
    } else {
      // Otherwise, append the value directly
      formData.append(key, value);
    }
  });

  return formData;
}

export default serializeForm;
