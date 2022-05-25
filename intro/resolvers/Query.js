exports.Query = {
  hello: (parent, args, context) => {
    return ['World'];
  },
  products: (parent, { filter }, { db }) => {
    let filterProducts = db.products;

    // when filter argument is used
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale === true) {
        filterProducts = filterProducts.filter((product) => product.onSale === true);
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filterProducts = filterProducts.filter((product) => {
          let sumRating = 0;
          let numOfReviews = 0;

          db.reviews.forEach((reviewItem) => {
            if (reviewItem.productId === product.id) {
              sumRating += reviewItem.rating;
              numOfReviews++;
            }
          });

          const avgProductRating = sumRating / numOfReviews;
          return avgProductRating >= avgRating;
        });
      }
    }

    return filterProducts;
  },
  product: (parent, args, { db }) => {
    const productId = args.id;

    const product = db.products.find((prod) => prod.id === productId);
    return product ? product : null;
  },
  categories: (parent, args, { db }) => {
    return db.categories;
  },
  category: (parent, args, { db }) => {
    const { id } = args;

    const category = db.categories.find((cat) => cat.id === id);
    return category ? category : null;
  },
};
