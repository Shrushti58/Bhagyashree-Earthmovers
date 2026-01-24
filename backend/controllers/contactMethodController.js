import ContactInfo from "../models/ContactMethod.js";

export const getContactInfo = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      // Create default contact info if none exists
      contactInfo = await ContactInfo.create({
        businessName: "Bhagyashree Earthmovers",
        businessEmail: "info@bhagyashreeearthmovers.com",
        phones: [],
        addresses: [],
        workingHours: [],
        socialMedia: []
      });
    }
    
    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update contact info (single document)
export const updateContactInfo = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      // Create if doesn't exist
      contactInfo = await ContactInfo.create(req.body);
    } else {
      // Update existing
      contactInfo = await ContactInfo.findOneAndUpdate(
        {},
        req.body,
        { new: true, runValidators: true }
      );
    }
    
    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a phone to contact info
export const addPhone = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      contactInfo = await ContactInfo.create({
        phones: [req.body]
      });
    } else {
      contactInfo.phones.push(req.body);
      await contactInfo.save();
    }
    
    res.status(201).json(contactInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add an address to contact info
export const addAddress = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      contactInfo = await ContactInfo.create({
        addresses: [req.body]
      });
    } else {
      contactInfo.addresses.push(req.body);
      await contactInfo.save();
    }
    
    res.status(201).json(contactInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add working hours to contact info
export const addWorkingHours = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      contactInfo = await ContactInfo.create({
        workingHours: [req.body]
      });
    } else {
      contactInfo.workingHours.push(req.body);
      await contactInfo.save();
    }
    
    res.status(201).json(contactInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add social media to contact info
export const addSocialMedia = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      contactInfo = await ContactInfo.create({
        socialMedia: [req.body]
      });
    } else {
      contactInfo.socialMedia.push(req.body);
      await contactInfo.save();
    }
    
    res.status(201).json(contactInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update specific item in array
export const updateArrayItem = async (req, res) => {
  try {
    const { arrayName, itemId } = req.params;
    const contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      return res.status(404).json({ message: "Contact info not found" });
    }
    
    const array = contactInfo[arrayName];
    const itemIndex = array.findIndex(item => item._id.toString() === itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    array[itemIndex] = { ...array[itemIndex].toObject(), ...req.body };
    await contactInfo.save();
    
    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteArrayItem = async (req, res) => {
  try {
    const { arrayName, itemId } = req.params;
    const contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      return res.status(404).json({ message: "Contact info not found" });
    }
    
    contactInfo[arrayName] = contactInfo[arrayName].filter(
      item => item._id.toString() !== itemId
    );
    
    await contactInfo.save();
    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};