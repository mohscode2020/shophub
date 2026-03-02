import { Target, Shield, Award, Users } from 'lucide-react';

export function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-stone-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            About Nestora Living
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            A curated home and lifestyle comparison platform
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              Nestora Living is a curated home and lifestyle comparison platform. Our mission is to help modern homeowners and renters upgrade their living spaces with confidence.
            </p>

            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              We research top-rated home and lifestyle products and present structured comparisons from trusted online retailers.
            </p>

            <p className="text-lg text-stone-700 leading-relaxed mb-8">
              Instead of promoting just one store, we provide multiple purchasing options — allowing you to compare availability, pricing, shipping, and retailer reputation before making a decision.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-900 mb-12 text-center">What We Focus On</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ValueCard
              icon={Shield}
              title="Transparent Comparisons"
              description="We present honest, side-by-side comparisons without favoring any single retailer."
            />
            <ValueCard
              icon={Target}
              title="Practical Buying Guidance"
              description="Real-world recommendations based on research, not just marketing claims."
            />
            <ValueCard
              icon={Award}
              title="Trusted Retail Partners"
              description="We only work with reputable online retailers with proven track records."
            />
            <ValueCard
              icon={Users}
              title="Long-term Product Value"
              description="We focus on quality and durability, not just the lowest price."
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 border border-emerald-100">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">Our Partnership Model</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-4">
              Nestora Living partners with reputable online retailers, including Amazon, AliExpress, and other affiliate programs. When you click a link and make a purchase, we may earn a commission — at no additional cost to you.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed font-medium">
              Our editorial decisions are independent and based on research, not commission rates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description }: any) {
  return (
    <div className="bg-white rounded-xl p-8 border border-stone-200 hover:border-emerald-300 hover:shadow-lg transition-all group">
      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-3">{title}</h3>
      <p className="text-stone-600 leading-relaxed">{description}</p>
    </div>
  );
}
