const { Product } = require("../models");
var count = 0;

// 상품등록(Admin)
const postProduct = async (req, res) => {
  try {
    const { productImage, productName, price, desc, category, delivery } =
      req.body;

    await Product.create({
      productImage,
      productName,
      price,
      desc,
      category,
      delivery,
    });
    res.status(201).json({ success: true, message: "상품을 등록하였습니다." });
  } catch (error) {
    //`${req.method} ${req.originalUrl} : ${error.message}`
    //req.method= 어떤 메소드에서 오류인지
    //req.originalUrl= 어떤 파일에서 나는 오류인지
    //req.message= 에러에 관한 메세지
    const message = `${req.method} ${req.originalUrl} : ${error.message}`;
    console.log(message);
    res.status(400).json({ errorMessage: "상품 등록에 실패하였습니다." });
  }
};

// 상품삭제
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  await Product.destroy({ where: { productId } });
  res.status(200).json({ success: true, message: "상품을 삭제하였습니다." });
};

// 전체상품 조회
const getAllProduct = async (req, res) => {
  try {
    const data = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json({ data });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: "상품 조회에 실패하였습니다.",
    });
  }
};

//상품 6개씩 조회
const getlimitProduct = async (req, res) => {
  try {
    // console.log(count.length===undefined)
    const Productdata = await Product.findAll({});
    count++;
    console.log(count);
    const productCount = Productdata.length; //상품 전체 갯수
    const divied = Math.ceil(productCount / 6); //전체 상품나누는 횟수
    const data = await Product.findAll({
      offset: 6 * (count % divied),
      limit: 6,
      order: [["createdAt", "DESC"]],
    });

    res.json({ data });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: "일부상품 조회에 실패하였습니다.",
    });
  }
};

// 상품 상세 조회
const getDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    const detailProduct = await Product.findOne({
      where: { productId },
    });

    if (!detailProduct) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "상품이 존재하지 않습니다." });
    }

    res.json({ detailProduct });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: "상품 조회에 실패하였습니다.",
    });
  }
};

// 카테고리 상품 조회
const getCategory = async (req, res) => {
  try {
    const { category } = req.params;

    console.log("category?", category);

    const data = await Product.findAll({
      where: { category },
    });

    if (!data) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "상품이 존재하지 않습니다." });
    }

    res.json({ data });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: "상품 조회에 실패하였습니다.",
    });
  }
};

module.exports = {
  postProduct,
  getAllProduct,
  deleteProduct,
  getDetail,
  getCategory,
  getlimitProduct,
};
