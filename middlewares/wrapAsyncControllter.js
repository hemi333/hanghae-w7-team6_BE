//비동기 함수 오류 next하는 미들웨어
const wrapAsyncController = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = wrapAsyncController;
