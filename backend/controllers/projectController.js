import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  if (req.file) req.body.image = req.file.path;
  const project = await Project.create(req.body);
  res.status(201).json(project);
};

export const getAllProjects = async (_, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Not found" });
  res.json(project);
};

export const updateProject = async (req, res) => {
  if (req.file) req.body.image = req.file.path;
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(project);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
