const Certificate = require("../models/certificateModel");

// Helper to normalize certificate input before saving or updating
function normalizeCertificateData(payload) {
  return {
    title: payload.title?.trim(),
    issuingOrganization: payload.issuingOrganization?.trim(),
    credentialId: payload.credentialId?.trim(),
    credentialUrl: payload.credentialUrl?.trim(),
    certificateImage: payload.certificateImage?.trim(),
    issueDate: payload.issueDate,
    featured: payload.featured,
    displayOrder: payload.displayOrder,
  };
}

// Get all certificates sorted by featured, display order, and creation date
async function getCertificates() {
  try {
    return await Certificate.find()
      .sort({ featured: -1, displayOrder: 1, createdAt: -1 });
  } catch (error) {
    const err = new Error("Failed to fetch certificates");
    err.statusCode = 500;
    throw err;
  }
}

// Get one certificate by its ID
async function getCertificateById(certificateId) {
  try {
    const certificate = await Certificate.findById(certificateId);

    if (!certificate) {
      const error = new Error("Certificate not found");
      error.statusCode = 404;
      throw error;
    }

    return certificate;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to fetch certificate");
    err.statusCode = 500;
    throw err;
  }
}

// Create a new certificate
async function createCertificate(payload) {
  try {
    const normalizedData = normalizeCertificateData(payload);
    const certificate = new Certificate(normalizedData);
    return await certificate.save();
  } catch (error) {
    const err = new Error("Failed to create certificate");
    err.statusCode = 500;
    throw err;
  }
}

// Update an existing certificate by ID
async function updateCertificate(certificateId, payload) {
  try {
    const normalizedData = normalizeCertificateData(payload);
    const certificate = await Certificate.findByIdAndUpdate(
      certificateId,
      normalizedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!certificate) {
      const error = new Error("Certificate not found");
      error.statusCode = 404;
      throw error;
    }

    return certificate;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to update certificate");
    err.statusCode = 500;
    throw err;
  }
}

// Delete a certificate by ID
async function deleteCertificate(certificateId) {
  try {
    const certificate = await Certificate.findByIdAndDelete(certificateId);

    if (!certificate) {
      const error = new Error("Certificate not found");
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: "Certificate deleted successfully",
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to delete certificate");
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  normalizeCertificateData,
  getCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
