import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, ArrowRight, ArrowLeft, Mail, CheckCircle2 } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

const newsArticles = [
  {
    id: 'gidan-solar-commissioned',
    title: 'Commissioning of the 45th Solar Classroom in Gidan Community',
    date: 'August 14, 2026',
    category: 'Field Milestone',
    author: 'Field Engineering Team',
    excerpt: 'After four months of construction alongside local village craftsmen, Gidan Community Primary School officially switched on clean solar lighting and opened its 500-book reading box.',
    image: '/images/IMG_0303.JPG',
    body: `
      On Thursday, August 14, 2026, village elders, teachers, and pupils of Gidan Community in Kaduna State gathered to cut the ribbon on a brand new 3-classroom block powered entirely by rooftop solar arrays.

      Before this intervention, children studied on compacted dirt floors inside a mud-walled shelter that had to be evacuated whenever rain clouds gathered. Today, the classrooms feature weather-insulated zinc roofing, ceiling ventilation fans, dual-seater wooden desks built by local carpenters, and an attached clean water borehole.

      "Our pupils no longer fear the rain or the dark," said Headmistress Mrs. Amina Danjuma during the opening ceremony. "Attendance has already jumped by 40% in our first week."

      This project was 100% funded through individual donor contributions, with zero cuts taken for administrative expenses.
    `
  },
  {
    id: 'mobile-health-enugu-outreach',
    title: 'Q3 Mobile Medical Outreach Treats Over 650 Patients in Enugu Rural',
    date: 'July 28, 2026',
    category: 'Medical Mission',
    author: 'Dr. Zainab Aliyu, Lead Physician',
    excerpt: 'A four-day clinical mission deployed across three remote hamlets in Oji River District, providing free malaria triage, maternal health packs, and essential hypertension management.',
    image: '/images/food-distribution.jpg',
    body: `
      From July 24–27, 2026, Ten Kind Hands deployed two 4x4 mobile clinic vehicles staffed by seven volunteer doctors, nurses, and pharmacists deep into the rural farming settlements of Oji River, Enugu State.

      Over four days of dawn-to-dusk clinics:
      • 654 patients received one-on-one medical consultations.
      • 412 rapid malaria diagnostic tests were administered, with 100% of positive cases receiving full free courses of Artemisinin-based combination therapy (ACT).
      • 85 expectant mothers received sterile delivery packs (Mama Kits) and prenatal multivitamin courses.
      • 12 emergency hospital transport vouchers were issued for patients requiring urgent specialized surgical intervention.

      "For many elderly patients in these hamlets, this was their first encounter with a licensed medical practitioner in over two years," noted Dr. Zainab Aliyu.
    `
  },
  {
    id: 'annual-audit-2025-released',
    title: 'Ten Kind Hands Releases 2025 Full Financial & Field Impact Audit',
    date: 'June 30, 2026',
    category: 'Transparency',
    author: 'Board of Trustees',
    excerpt: 'Demonstrating 100% direct giving: 88.4% of all institutional funds directed to frontline deliverables, with trustee endowments covering all overhead and banking fees.',
    image: '/images/IMG_0300.JPG',
    body: `
      In accordance with our founding charter of radical transparency, Ten Kind Hands has published its complete 2025 Audited Financial Statement and Independent Field Review.

      Key Highlights:
      • Total donor funds raised in 2025: ₦142,600,000 (~$185,000 USD).
      • 88.4% deployed directly to classroom construction, student tuition scholarships, and pharmaceutical supplies.
      • 11.6% allocated to field monitoring, GPS tracking verification, and certified engineering audits.
      • 0.0% deducted for administrative overhead — 100% of executive salaries and office expenses are covered under a separate trustee endowment.

      The full 38-page audit report with itemized vendor receipts is available for free download on our Transparency page.
    `
  }
];

export default function News({ initialArticleId = null }) {
  const { news } = useData();
  const currentArticles = news && news.length > 0 ? news : newsArticles;
  const [selectedArticleId, setSelectedArticleId] = useState(initialArticleId);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const activeArticle = currentArticles.find((a) => a.id === selectedArticleId);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  // Render Full Article View
  if (activeArticle) {
    return (
      <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
        <div className="relative max-w-3xl mx-auto px-4 md:px-8 py-6 overflow-hidden">
          <CurvedWaveBackground side="right" />

          <div className="relative z-10">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-ink-light hover:text-ink mb-8 cursor-pointer font-heading"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Field Dispatches</span>
            </button>

            <div className="flex items-center gap-3 text-xs text-ink-muted mb-3 font-heading">
              <span className="px-3 py-1 rounded-full bg-sand text-primary font-bold border border-[#e7e2d8]">
                {activeArticle.category}
              </span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>By {activeArticle.author}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-ink mb-6 tracking-tight leading-tight">
              {activeArticle.title}
            </h1>

            <div className="w-full h-56 sm:h-72 md:h-96 rounded-3xl overflow-hidden mb-8 border border-[#e7e2d8]">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose text-sm text-ink-light leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {activeArticle.body}
            </div>

            <div className="mt-12 pt-8 border-t border-[#e7e2d8] flex justify-between items-center">
              <button
                onClick={() => setSelectedArticleId(null)}
                className="btn-secondary text-xs px-6 py-2.5 cursor-pointer font-heading"
              >
                Back to Dispatches
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // News Index View
  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Field Dispatches
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-6 tracking-tight">
            Stories of progress, <br />
            <span className="text-primary">direct from the frontline.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Read verified updates, project handovers, and clinical accounts from our team working across Nigerian communities.
          </p>
        </div>
      </section>

      {/* Article Cards with Mirrored Wave */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto mb-20 overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentArticles.map((art) => (
            <div
              key={art.id}
              className="paper-card rounded-3xl overflow-hidden flex flex-col justify-between bg-white/95 backdrop-blur-xs shadow-xs"
            >
              <div>
                <div className="h-48 sm:h-52 overflow-hidden relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-[10px] font-heading font-bold text-primary shadow-xs">
                    {art.category}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[11px] text-ink-muted mb-2 font-heading">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{art.date}</span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-ink mb-3 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-ink-light leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => {
                    setSelectedArticleId(art.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-heading font-bold text-primary hover:text-primary-dark flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Full Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-4 md:px-8 max-w-4xl mx-auto">
        <div className="bg-sand p-5 sm:p-8 md:p-12 rounded-3xl border border-[#e7e2d8] text-center">
          <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-2">
            Stay Connected with Field Updates
          </h3>
          <p className="text-xs sm:text-sm text-ink-light max-w-md mx-auto mb-6 leading-relaxed">
            We send monthly reports on our outreaches and projects as well as impact measurements
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-white px-5 py-2.5 rounded-full border border-emerald-200 font-heading">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Thank you for subscribing to our monthly dispatches.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-white border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto text-xs px-6 py-3 rounded-full cursor-pointer shadow-xs font-heading font-semibold"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
