import Product from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const parseRequestArray = (value) => {
  if (!value) return undefined;
  if (Array.isArray(value)) return value;
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const newProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  console.log(newProduct);
  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const getFilteredProducts = catchAsync(async (req, res, next) => {
  const {
    gender,
    category,
    type,
    sizes,
    colors,
    onSale,
    isNew,
    priceMin,
    priceMax,
    search,
  } = req.query;

  const filter = {};

  const genderValues = parseRequestArray(gender);
  if (genderValues?.length) filter.gender = { $in: genderValues };

  const categoryValues = parseRequestArray(category);
  if (categoryValues?.length) filter.category = { $in: categoryValues };

  const typeValues = parseRequestArray(type);
  if (typeValues?.length) filter.type = { $in: typeValues };

  const sizeValues = parseRequestArray(sizes);
  if (sizeValues?.length) filter.sizes = { $in: sizeValues };

  const colorValues = parseRequestArray(colors);
  if (colorValues?.length) {
    filter.$or = [
      { "colors.id": { $in: colorValues } },
      { "colors.label": { $in: colorValues } },
    ];
  }

  if (onSale !== undefined) {
    if (onSale === "true" || onSale === "false") {
      filter.isSale = onSale === "true";
    }
  }

  if (isNew !== undefined) {
    if (isNew === "true" || isNew === "false") {
      filter.isNew = isNew === "true";
    }
  }

  const min = priceMin !== undefined ? Number(priceMin) : undefined;
  const max = priceMax !== undefined ? Number(priceMax) : undefined;
  if (!Number.isNaN(min) || !Number.isNaN(max)) {
    filter.price = {};
    if (!Number.isNaN(min)) filter.price.$gte = min;
    if (!Number.isNaN(max)) filter.price.$lte = max;
  }

  if (search) {
    const term = search.trim();
    if (term.length) {
      const regexp = new RegExp(term, "i");
      filter.$or = filter.$or || [];
      filter.$or.push({ name: regexp }, { description: regexp });
    }
  }

  const products = await Product.find(filter);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
