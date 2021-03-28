import { fetchHistory } from "./fetch-stat";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const { symbol } = req.query;
      if (!symbol) return res.json({
        success: false,
        data: {}
      });

      const history = await fetchHistory(symbol);

      if (!history) return res.json({
        success: false,
        data: {}
      });

      return res.json({
        success: true,
        data: {
          history
        }
      });
    } catch (err) {
      console.log("fetch news err : ", err && err.response);

      return res.json({
        success: false,
        data: {}
      });
    }
  }
}
