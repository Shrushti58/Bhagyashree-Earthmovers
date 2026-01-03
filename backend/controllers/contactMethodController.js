import ContactMethod from "../models/ContactMethod.js";

export const createContactMethod = async (req, res) => {
    try {
        const method = await ContactMethod.create(req.body);
        res.status(201).json(method);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getContactMethods = async (req, res) => {
    try {
        const methods = await ContactMethod.find().sort({ createdAt: -1 });
        res.status(200).json(methods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getContactMethodById = async (req, res) => {
    try {
        const method = await ContactMethod.findById(req.params.id);
        if (!method)
            return res.status(404).json({ message: "Contact method not found" });

        res.status(200).json(method);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateContactMethod = async (req, res) => {
    try {
        const method = await ContactMethod.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!method)
            return res.status(404).json({ message: "Contact method not found" });

        res.status(200).json(method);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteContactMethod = async (req, res) => {
    try {
        const method = await ContactMethod.findByIdAndDelete(req.params.id);
        if (!method)
            return res.status(404).json({ message: "Contact method not found" });

        res.status(200).json({ message: "Contact method deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
