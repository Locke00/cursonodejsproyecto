
function notFoundOne(one) {
  if (!one) {
    const error = new Error("NOT FOUND!");
    error.statusCode = 404;
    throw error;
  }
}

export default notFoundOne;
