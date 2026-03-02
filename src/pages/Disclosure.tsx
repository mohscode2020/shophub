import { AlertCircle } from 'lucide-react';

export function Disclosure() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-stone-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Affiliate Disclosure
          </h1>
          <p className="text-lg text-stone-600">
            Transparency in how we operate
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12 flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Important Disclosure</h3>
              <p className="text-amber-800">
                Nestora Living participates in affiliate marketing programs. We may earn commissions from purchases made through links on our site.
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">How It Works</h2>

            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              Nestora Living participates in multiple affiliate marketing programs. This means we may earn a commission when you purchase products through links on our website.
            </p>

            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              We may partner with companies such as Amazon, AliExpress, and other reputable online retailers.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-6 mt-12">What This Means for You</h2>

            <div className="space-y-6">
              <InfoBox
                title="No Extra Cost"
                description="Commissions help support our research and content creation. This does not affect the price you pay."
              />
              <InfoBox
                title="Independent Reviews"
                description="We aim to provide transparent, unbiased comparisons and recommendations."
              />
              <InfoBox
                title="Research-Driven"
                description="Our editorial decisions are based on product quality and value, not commission rates."
              />
              <InfoBox
                title="Multiple Options"
                description="We present multiple retailer options so you can choose based on your preferences."
              />
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <h3 className="text-xl font-bold text-stone-900 mb-4">Our Commitment</h3>
              <p className="text-stone-700 leading-relaxed">
                We are committed to maintaining your trust. If we recommend a product, it's because we genuinely believe it offers value. We never let commission rates influence our recommendations or comparisons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoBox({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
      <h3 className="font-semibold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600">{description}</p>
    </div>
  );
}
