const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    yearOfStudy: { type: String, required: true, trim: true },

    members: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          email: { type: String, required: true, trim: true, lowercase: true },
          phone: { type: String, required: true, trim: true },
        },
      ],
      default: [],
    },
    preferredProblem: { type: String, required: true, trim: true, index: true },

    qrCode: { type: String, default: 'N/A' },
    paymentScreenshot: {
      originalName: { type: String, default: 'N/A' },
      mimeType: { type: String, default: 'N/A' },
      size: { type: Number, default: 0 },
      fileId: { type: String, default: 'N/A', index: true },
    },

    pptFile: {
      originalName: { type: String, default: 'N/A' },
      mimeType: { type: String, default: 'N/A' },
      size: { type: Number, default: 0 },
      fileId: { type: String, default: 'N/A', index: true },
    },

    // no status field (approved/pending/rejected removed)
  },
  { timestamps: true }
);

RegistrationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Registration', RegistrationSchema);

