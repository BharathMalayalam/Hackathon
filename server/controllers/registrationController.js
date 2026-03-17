const Registration = require('../models/Registration');
const { getBucket } = require('../db/gridfs');

async function uploadToGridFS(file, prefix) {
    const bucket = getBucket();
    const filename = `${prefix}-${Date.now()}-${file.originalname || 'file'}`;
    return new Promise((resolve, reject) => {
        const up = bucket.openUploadStream(filename, {
            contentType: file.mimetype,
            metadata: {
                originalName: file.originalname,
                fieldname: file.fieldname,
            },
        });
        up.on('error', reject);
        up.on('finish', () => resolve({ _id: up.id }));
        up.end(file.buffer);
    });
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

        const [paymentStored, pptStored] = await Promise.all([
            uploadToGridFS(payment, 'payment'),
            uploadToGridFS(ppt, 'ppt'),
        ]);

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
            paymentScreenshot: {
                originalName: payment.originalname,
                mimeType: payment.mimetype,
                size: payment.size,
                fileId: String(paymentStored._id),
            },
            pptFile: {
                originalName: ppt.originalname,
                mimeType: ppt.mimetype,
                size: ppt.size,
                fileId: String(pptStored._id),
            },
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
