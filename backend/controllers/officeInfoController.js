import OfficeInfo from "../models/OfficeInfo.js";

export const createOfficeInfo = async (req, res) => {
    try {
        const officeInfo = await OfficeInfo.create(req.body);
        res.status(201).json(officeInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getOfficeInfos = async (req, res) => {
    try {
        const officeInfos = await OfficeInfo.find().sort({ createdAt: -1 });
        res.status(200).json(officeInfos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOfficeInfoById = async (req, res) => {
    try {
        const officeInfo = await OfficeInfo.findById(req.params.id);
        if (!officeInfo)
            return res.status(404).json({ message: "Office info not found" });

        res.status(200).json(officeInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOfficeInfo = async (req, res) => {
    try {
        const officeInfo = await OfficeInfo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!officeInfo)
            return res.status(404).json({ message: "Office info not found" });

        res.status(200).json(officeInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOfficeInfo = async (req, res) => {
    try {
        const officeInfo = await OfficeInfo.findByIdAndDelete(req.params.id);
        if (!officeInfo)
            return res.status(404).json({ message: "Office info not found" });

        res.status(200).json({ message: "Office info deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
