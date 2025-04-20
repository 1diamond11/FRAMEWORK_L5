const {
    getAllPatterns,
    getPatternById,
    createPattern,
    updatePattern,
    patchPattern,
    deletePattern
  } = require("../../controllers/patternsController");
  
  module.exports = (app) => {
    app.get("/api/v1/patterns", getAllPatterns);
    app.get("/api/v1/patterns/:id", getPatternById);
    app.post("/api/v1/patterns", createPattern);
    app.put("/api/v1/patterns/:id", updatePattern);
    app.patch("/api/v1/patterns/:id", patchPattern);
    app.delete("/api/v1/patterns/:id", deletePattern);
  };