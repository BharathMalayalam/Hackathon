const Registration = require('../models/Registration');

function uploadedFileToMeta(file) {
    if (!file) return undefined;
    return {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        filename: file.filename,
        url: `/uploads/${file.filename}`,
    };
}

exports.registerTeam = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            college,
            department,
            yearOfStudy,
            members,
            preferredProblem,
            qrCode
        } = req.body;

        // Basic validation (projectIdea removed per frontend changes)
        if (!fullName || !email || !phone || !college || !department || !yearOfStudy || !preferredProblem) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let parsedMembers = [];
        if (members) {
            try {
                parsedMembers = typeof members === 'string' ? JSON.parse(members) : members;
            } catch {
                return res.status(400).json({ error: 'Invalid members format' });
            }
        }
        if (!Array.isArray(parsedMembers)) {
            return res.status(400).json({ error: 'Invalid members format' });
        }
        if (parsedMembers.length > 4) {
            return res.status(400).json({ error: 'Team strength must be 5 including leader' });
        }
        for (const m of parsedMembers) {
            if (!m?.name || !m?.email || !m?.phone) {
                return res.status(400).json({ error: 'Each member must have name, email, and phone' });
            }
        }

        const payment = req.files?.paymentScreenshot?.[0];
        const ppt = req.files?.pptFile?.[0];

        if (!ppt) {
            return res.status(400).json({ error: 'PPT is required' });
        }
        if (!payment) {
            return res.status(400).json({ error: 'Payment screenshot is required' });
        }

        const registration = await Registration.create({
            fullName,
            email,
            phone,
            college,
            department,
            yearOfStudy,
            members: parsedMembers,
            preferredProblem,
            qrCode: qrCode || 'N/A',
            paymentScreenshot: uploadedFileToMeta(payment) || undefined,
            pptFile: uploadedFileToMeta(ppt) || undefined,
        });

        res.status(201).json({ message: 'Registration successful!', registration });
    } catch (error) {
        console.error('Registration Error:', error?.message || error);
        if (error?.stack) console.error(error.stack);
        res.status(500).json({
            error: 'Failed to process registration.',
            details: error?.message || String(error),
        });
    }
};
