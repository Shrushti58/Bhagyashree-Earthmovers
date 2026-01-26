import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getFeaturedProjects,
  getProjectsByType,
  getRecentProjects,
  addProjectImage,
  removeProjectImage,
  toggleFeatured
} from '../controllers/projectController.js';
import upload, { uploadMultiple } from '../middleware/upload.js';
import { protect} from '../middleware/authMiddleware.js'; 
const router = express.Router();

router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/recent', getRecentProjects);
router.get('/type/:type', getProjectsByType);
router.get('/:id', getProjectById);
router.post('/', protect,uploadMultiple, createProject);
router.put('/:id', protect,uploadMultiple, updateProject);
router.delete('/:id', protect, deleteProject);
router.patch('/:id/toggle-featured', protect,toggleFeatured);
router.post('/:id/add-image', protect,upload.single('image'), addProjectImage);
router.delete('/:id/remove-image', protect,removeProjectImage);

export default router;