import asyncHandler from "express-async-handler";
var slugify = require("slugify");
import _ from "lodash";
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
import Product from "../model/productModal";
export const createProduct = asyncHandler(async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (!err) {
      console.log("files:", files);
      console.log("fields:", fields);
      const parsedData = JSON.parse(fields.data);
      console.log("parsedData:", parsedData);
      const images = {};
      for (let i = 0; i < Object.keys(files).length; i++) {
        const mimeType = files[`image${i + 1}`].mimetype;
        const extension = mimeType.split("/")[1].toLowerCase();
        if (
          extension === "jpeg" ||
          extension === "jpg" ||
          extension === "png"
        ) {
          const imageName = uuidv4() + `.${extension}`;
          const __dirname = path.resolve();
          const newPath = __dirname + `/../client/public/images/${imageName}`;
          images[`image${i + 1}`] = imageName;
          fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      }
      try {
        const response = await Product.create({
          title: parsedData.title,
          slug: slugify(parsedData.title, "-"),
          price: parseInt(parsedData.price),
          discount: parseInt(parsedData.discount),
          stock: parseInt(parsedData.stock),
          category: parsedData.category,
          colors: parsedData.colors,
          sizes: parsedData.sizesList,
          image1: images["image1"],
          image2: images["image2"],
          image3: images["image3"],
          description: fields.description,
        });
        return res.status(200).json({ msg: "Product has created", response });
      } catch (error) {
        console.log(">>>>>>>.check :", error);
      }
    }
  });
});
export const getProductsByQuery = asyncHandler(async (req, res) => {
  try {
    //Tách các trường đặc biệt ra khỏi query
    const queries = { ...req.query };
    console.log("queries:", queries);
    const excludeFields = ["limit", "sort", "page", "fields"];
    //xoá các query dac biet
    excludeFields.forEach((ele) => {
      delete queries[ele];
    });
    let queryString = JSON.stringify(queries);
    console.log("queryString:", queryString);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (macthed) => `$${macthed}`
    );
    const formatedQueries = JSON.parse(queryString);
    //filtering tile
    if (queries?.title) {
      formatedQueries.title = { $regex: queries.title, $options: "i" };
    }
    //số lượng sản phản thỏa mản đk !== số lượng sản phẩm trả về một lần
    let queryCommand = Product.find(formatedQueries);
    //sorting
    if (req.query.sort) {
      console.log("req.query.sort", req.query.sort);
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }
    //fields, limited
    if (req.query.fields) {
      const fieldsBy = req.query.fields.split(" ").join(" ");
      queryCommand = queryCommand.select(fieldsBy);
    }

    if (req.query.page) {
      const page = req.query.page * 1 || 1;
      const limit = 7;
      const skip = (page - 1) * limit;
      queryCommand = queryCommand.skip(skip).limit(limit).sort("-updatedAt");
    }
    //pagination
    queryCommand.exec(async (err, result) => {
      if (err) throw new Error(err.message);
      //số lượng sản phản thỏa mản đk
      const counts = await Product.find(formatedQueries).countDocuments();
      const limit = 7;
      const totalPage = Math.ceil(counts / limit);
      console.log("totalPage:", totalPage);
      return res.status(200).json({
        success: result ? true : false,
        products: result ? result : "cannot get products",
        counts,
        totalPage,
        // totalPage: Math.ceil(counts / limit)
      });
    });
  } catch (err) {
    if (err.name === "CastError")
      return new Error(`Invalid ${err.path}: ${err.value}`);
    return err;
  }
});
