const certificateService = require("../services/certificateService");

// Get all certificates
async function getCertificates(req, res, next) {
  try {
    const certificates = await certificateService.getCertificates();

    res.status(200).json({
      success: true,
      data: {
        certificates,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get one certificate by ID
async function getCertificate(req, res, next) {
  try {
    const certificate = await certificateService.getCertificateById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        certificate,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Create a new certificate
async function createCertificate(req, res, next) {
  try {
    const certificate = await certificateService.createCertificate(req.body);

    res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: {
        certificate,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Update an existing certificate by ID
async function updateCertificate(req, res, next) {
  try {
    const certificate = await certificateService.updateCertificate(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: {
        certificate,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Delete a certificate by ID
async function deleteCertificate(req, res, next) {
  try {
    const result = await certificateService.deleteCertificate(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
