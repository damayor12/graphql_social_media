exports.Category = {
  products: ({ id: categoryId }, { filter }, { db }) => {
    //data

    //

    const categoryProducts = db.products.filter((product) => product.categoryId === categoryId);
    let filterCategoryProducts = categoryProducts;

    // when filter argument is used
    if (filter) {
      if (filter.onSale === true) {
        filterCategoryProducts = filterCategoryProducts.filter(
          (product) => product.onSale === true,
        );
      }
    }
    return filterCategoryProducts;
  },
};
