import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const allowedStatus = ['Completed', 'In Progress', 'Upcoming'];
    if (!allowedStatus.includes(req.body.status)) {
      req.body.status = 'Completed';
    }
    req.body.featured = req.body.featured === 'true';

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    req.body.images = req.files.map(file => file.path);
    req.body.image = req.body.images[0];

    if (typeof req.body.tags === 'string') {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch {
        req.body.tags = req.body.tags.split(',').map(t => t.trim());
      }
    }

    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      project
    });

  } catch (error) {
    console.error("CREATE ERROR:", error.message);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const { type, status, featured, limit = 50, page = 1, sort = '-createdAt' } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (featured !== undefined) filter.featured = featured === 'true';

    const skip = (Number(page) - 1) * Number(limit);

    const [projects, total] = await Promise.all([
      Project.find(filter).sort(sort).limit(Number(limit)).skip(skip),
      Project.countDocuments(filter)
    ]);

    res.json({
      success: true,
      projects,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedProjects = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const projects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { limit = 20 } = req.query;

    const projects = await Project.find({ type })
      .sort({ year: -1, createdAt: -1 })
      .limit(Number(limit));

    res.json({ success: true, type, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecentProjects = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateProject = async (req, res) => {
  try {
    const updateData = { ...req.body };

    const allowedStatus = ['Completed', 'In Progress', 'Upcoming'];
    if (updateData.status && !allowedStatus.includes(updateData.status)) {
      updateData.status = 'Completed';
    }

    if (updateData.featured !== undefined) {
      updateData.featured = updateData.featured === 'true';
    }

    if (typeof updateData.tags === 'string') {
      try {
        updateData.tags = JSON.parse(updateData.tags);
      } catch {
        updateData.tags = updateData.tags.split(',').map(t => t.trim());
      }
    }

    if (req.files && req.files.length > 0) {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }

      const newImages = req.files.map(file => file.path);
      updateData.images = [...project.images, ...newImages];

      if (!updateData.image) {
        updateData.image = updateData.images[0];
      }
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, message: 'Project updated successfully', project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    res.json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete project'
    });
  }
};

export const addProjectImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const newImages = req.files.map(file => file.path);
    project.images.push(...newImages);
    project.image ||= project.images[0];

    await project.save();

    res.json({ success: true, message: 'Image added successfully', project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const removeProjectImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }

    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    await project.removeImage(imageUrl);

    res.json({
      success: true,
      message: 'Image removed successfully',
      project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to remove image'
    });
  }
};

export const toggleFeatured = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    project.featured = !project.featured;
    await project.save();

    res.json({
      success: true,
      message: `Project ${project.featured ? 'featured' : 'unfeatured'} successfully`,
      project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to toggle featured status'
    });
  }
};