import { Shield, Cookie, Database, Lock } from 'lucide-react';

export function Privacy() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-stone-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-stone-600">
            How we protect and use your information
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <PrivacyCard
              icon={Database}
              title="Data Collection"
              description="We collect non-personal data such as browser type, time spent on pages, and referring sources for analytics purposes."
            />
            <PrivacyCard
              icon={Cookie}
              title="Cookies"
              description="We use cookies to enhance user experience and track affiliate referrals for commission purposes."
            />
            <PrivacyCard
              icon={Shield}
              title="Third-Party Tracking"
              description="Third-party retailers may use their own tracking technologies when you visit their websites."
            />
            <PrivacyCard
              icon={Lock}
              title="Your Agreement"
              description="By using Nestora Living, you agree to our privacy practices as outlined in this policy."
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Information We Collect</h2>

            <p className="text-stone-700 leading-relaxed mb-6">
              Nestora Living may collect non-personal data such as browser type, time spent on pages, and referring sources for analytics purposes. This helps us understand how visitors use our site and improve the user experience.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-6 mt-12">How We Use Cookies</h2>

            <p className="text-stone-700 leading-relaxed mb-6">
              We use cookies to enhance user experience and track affiliate referrals. Cookies help us remember your preferences and understand which products and retailers are most popular with our visitors.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-6 mt-12">Third-Party Services</h2>

            <p className="text-stone-700 leading-relaxed mb-6">
              Third-party retailers may use their own tracking technologies when you visit their websites through our links. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-6 mt-12">Your Consent</h2>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
              <p className="text-stone-700 leading-relaxed font-medium">
                By using Nestora Living, you agree to our privacy practices as outlined in this policy. If you have questions or concerns about how we handle data, please contact us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PrivacyCard({ icon: Icon, title, description }: any) {
  return (
    <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
