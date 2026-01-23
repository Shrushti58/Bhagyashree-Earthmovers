import Equipment from "../models/Equipment.js";

const parseSpecs = (req) => {
  if (req.body.specs && typeof req.body.specs === "string") {
    req.body.specs = JSON.parse(req.body.specs);
  }
};

export const createEquipment = async (req, res) => {
  try {
    if (req.file) req.body.image = req.file.path;

    parseSpecs(req);

    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
  } catch (error) {
    console.error("CREATE EQUIPMENT ERROR:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getAllEquipment = async (_, res) => {
  const data = await Equipment.find().sort({ createdAt: -1 });
  res.json(data);
};

export const getEquipmentById = async (req, res) => {
  const data = await Equipment.findById(req.params.id);
  if (!data) return res.status(404).json({ message: "Not found" });
  res.json(data);
};

export const updateEquipment = async (req, res) => {
  try {
    if (req.file) req.body.image = req.file.path;

    parseSpecs(req);

    const data = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(data);
  } catch (error) {
    console.error("UPDATE EQUIPMENT ERROR:", error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteEquipment = async (req, res) => {
  await Equipment.findByIdAndDelete(req.params.id);
  res.json({ message: "Equipment deleted" });
};
