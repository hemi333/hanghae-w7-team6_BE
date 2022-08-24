
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
  getlimitProduc,
};
