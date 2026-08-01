import { motion } from "framer-motion";

function Certificates({ certificates = [] }) {
  return (
    <section id="certificates" className="bg-gray-100 py-20 sm:py-24">

      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <motion.h2
          className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Certificates
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">

          {certificates.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No certificates available yet.
            </p>
          )}

          {certificates.map((item) => (

            <div
              key={item._id || item.title}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex aspect-4/3 items-center justify-center bg-gray-200">
                {item.certificateImage ? (
                  <img src={item.certificateImage} alt={`${item.title} certificate`} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                ) : (
                  "Certificate"
                )}
              </div>

              <div className="p-5 sm:p-6">

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  {item.issuingOrganization}
                </p>

                {item.credentialUrl && (
                  <a href={item.credentialUrl} target="_blank" rel="noreferrer noopener" aria-label={`View credential for ${item.title}`} className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 underline underline-offset-4 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                    View Credential
                  </a>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Certificates;