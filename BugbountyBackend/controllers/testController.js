import Test from "../models/Tests.js";

// 📌 Add a new test
export const createTest = async (req, res) => {
  const {
    title,
    difficulty,
    description,
    duration,
    totalQuestions,
    passingScore,
    certification,
  } = req.body;

  try {
    const newTest = await Test.create({
      title,
      difficulty,
      description,
      duration,
      totalQuestions,
      passingScore,
      certification,
    });

    res.status(201).json({
      message: "Test created successfully!",
      test: newTest,
    });
  } catch (error) {
    console.error("Create test error:", error);
    res
      .status(500)
      .json({ message: "Failed to create test", error: error.message });
  }
};

// 📌 Get all tests
export const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    console.error("Fetch tests error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch tests", error: error.message });
  }
};

// 📌 Get single test by ID
export const getTestById = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id);
    if (!test) return res.status(404).json({ message: "Test not found" });

    res.status(200).json(test);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch test", error: error.message });
  }
};

// 📌 Delete test
export const deleteTest = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findByIdAndDelete(id);
    if (!test) return res.status(404).json({ message: "Test not found" });

    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete test", error: error.message });
  }
};

// 📌 Update test
export const updateTest = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    difficulty,
    description,
    duration,
    totalQuestions,
    passingScore,
    certification,
  } = req.body;

  try {
    const updatedTest = await Test.findByIdAndUpdate(
      id,
      {
        title,
        difficulty,
        description,
        duration,
        totalQuestions,
        passingScore,
        certification,
      },
      { new: true }
    );

    if (!updatedTest)
      return res.status(404).json({ message: "Test not found" });

    res.status(200).json({
      message: "Test updated successfully",
      test: updatedTest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update test", error: error.message });
  }
};
