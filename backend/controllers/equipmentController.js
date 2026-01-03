import Equipment from "../models/Equipment.js";

export const createEquipment = async (req, res) => {
  if (req.file) req.body.image = req.file.path;
  const equipment = await Equipment.create(req.body);
  res.status(201).json(equipment);
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
  if (req.file) req.body.image = req.file.path;
  const data = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(data);
};

export const deleteEquipment = async (req, res) => {
  await Equipment.findByIdAndDelete(req.params.id);
  res.json({ message: "Equipment deleted" });
};
