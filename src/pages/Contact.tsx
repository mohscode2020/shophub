import { Mail, Clock, MessageSquare } from 'lucide-react';

export function Contact() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-stone-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Contact Nestora Living
          </h1>
          <p className="text-lg text-stone-600">
            We'd love to hear from you
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <ContactCard
              icon={Mail}
              title="Email Us"
              description="hello@nestoraliving.com"
            />
            <ContactCard
              icon={Clock}
              title="Response Time"
              description="Within 48 hours"
            />
            <ContactCard
              icon={MessageSquare}
              title="We're Here For"
              description="Questions, collaborations, product inquiries"
            />
          </div>

          <div className="bg-gradient-to-br from-stone-50 to-emerald-50 rounded-2xl p-8 md:p-12 border border-stone-200">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Get in Touch</h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-12 text-center">
            <p className="text-stone-600">
              For questions, collaborations, or product inquiries, we respond within 48 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ icon: Icon, title, description }: any) {
  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200 text-center">
      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-semibold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600 text-sm">{description}</p>
    </div>
  );
}
