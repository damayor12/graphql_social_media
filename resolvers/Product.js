

exports.Product = {
  category: (parent, args, { categories }) => {
    const categoryId = parent.categoryId;
    return categories.find((category) => category.id === categoryId);
  },
  reviews: ({id}, args, { reviews }) => {
 
    return reviews.filter(review => review.productId === id)
  },
};
