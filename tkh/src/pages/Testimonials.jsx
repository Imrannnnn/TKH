import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Quote, Heart } from '../components/Icons';

export default function Testimonials({ onOpenDonate }) {
  const { testimonialsList } = useData();
  const [filter, setFilter] = useState('all');

  const defaultTestimonials = [
    {
      category: 'beneficiaries',
      quote: "We Appreciate TKH’s scholarship support, it eased financial pressure on families and encouraged pupils to remain focused and committed to their education.",
      author: "School Management",
      role: "Beneficiary School Management",
      institution: "Julimak Schools",
      avatar: "/images/partners/julimak-schools.webp"
    },
    {
      category: 'beneficiaries',
      quote: "We Appreciate the donation of notebooks, water bottles, and writing materials. The items support students’ learning, academic motivation, and welfare.",
      author: "School Administration",
      role: "Beneficiary School Administration",
      institution: "Jambells Schools, Ikorodu",
      avatar: "/images/partners/jambells-school.webp"
    },
    {
      category: 'beneficiaries',
      quote: "we are grateful for the food donations, including rice, semovita, spaghetti, seasoning, and noodles. the support as a source of hope and joy for the children in our care.",
      author: "Care Coordinator",
      role: "Orphans & Widows Home Care Team",
      institution: "Home of God’s Grace for Orphans and Widows",
      avatar: "/images/partners/home-of-gods-grace.webp"
    },
    {
      category: 'beneficiaries',
      quote: "We thank TKH for its generous donations. the support brought smiles to the children and made a meaningful difference to the scholars and the school community.",
      author: "School Management",
      role: "Beneficiary School Community",
      institution: "Phaozaan Private Schools",
      avatar: "/images/partners/phaozaan-private-school.webp"
    },
    {
      category: 'beneficiaries',
      quote: "We sincerely appreciate Ten Kind Hands Foundation for providing scholarships to our children, supporting our school with a computer lab equipment and additional classrooms, and donating gift items during Children’s Day. Your generosity and commitment to education are making a lasting impact on our children and school. Thank you for being a blessing to us!",
      author: "Becky Omagbogu",
      role: "Proprietor",
      institution: "Beckwin International School, Jos",
      avatar: "/images/beckwin-international-school-scholarships.webp"
    },
    {
      category: 'beneficiaries',
      quote: "We express our sincere gratitude and acknowledges the received food items and writing materials to the Orphans/Vulnerable children in our ministry. The ministry will ever remain grateful to you for the love you have shown us. Our heavenly father will reward and bless you bountifully.",
      author: "Rev. Dr. Elisha Akwai",
      role: "Ministry Director",
      institution: "City Ministry of EMS/ECWA (CME) - Gidan Bege Orphanage Home",
      avatar: "/images/gidan-bege-orphanage-outreach.webp"
    },
    {
      category: 'beneficiaries',
      quote: "Ten kind hand foundation indeed is an organization that is really touching life in so many ramifications, the orphans and vulnerable ones in the society. Their visit to Abba father Rich orphanage is really a wonderfully moment spent, with gifts from the organization at a time they are needed, foodstuffs and educational materials etc. Pls keep up with your good work to humanity, Good bless you all.",
      author: "Mr. Kingsley",
      role: "Coordinator (07031160630)",
      institution: "Abba Father Rich Orphanage Home",
      avatar: "/images/abba-father-orphanage-food-distribution.webp"
    },
    {
      category: 'beneficiaries',
      quote: "We express our appreciation on behalf of the traditional council in GURA-LOH-GUT GIRING ABATTOIR, JOS for the exceptional community services you have rendered in our community through your empowerment program. We have recognize your efforts in developing our community and we pray that the good Lord will continue to strengthens you more in your activities in Jesus name.",
      author: "Da Stephen Davou",
      role: "Traditional Council Leader (07057558662)",
      institution: "Gura-Loh-Gut Giring Abattoir, Jos",
      avatar: "/images/giring-zawan-empowerment.webp"
    },
    {
      category: 'beneficiaries',
      quote: "I write on behalf of Management and Student of House of Recab Ministry International to express our heart felt appreciation for your donation(school materials) and partnership with our organization. Your assistance both now and in the future, will sustain the hope the children we have, and fuel in them the zeal for fulfilled dreams. Thanks for your love, may the good Lord continue to bless and keep you and your members in HIS love.",
      author: "Tony Tonyin",
      role: "Head of Admin/Finance (08035810389)",
      institution: "House of Recab Ministry International",
      avatar: "/images/house-of-recab-outreach.webp"
    },
    {
      category: 'beneficiaries',
      quote: "Before Ten Kind Hands brought solar power and desks, our pupils learned on bare floors and had to go home whenever rain clouds gathered. Today, attendance has soared to over 98% and our children read aloud with pride.",
      author: "Mrs. Amina Danjuma",
      role: "Headmistress",
      institution: "Gidan Community Primary School, Kaduna State",
      avatar: "/images/IMG_0300.JPG"
    },
    {
      category: 'beneficiaries',
      quote: "The mobile health clinic detected my child's severe pneumonia in time and provided all treatments free of charge. Having caring medical staff reach our remote hamlet is a blessing I will never forget.",
      author: "Grace Adebayo",
      role: "Mother of 3 & Community Health Advocate",
      institution: "Rural Women's Forum, Ogun State",
      avatar: "/images/IMG_0995.JPG"
    },
    {
      category: 'beneficiaries',
      quote: "Ten Kind Hands does not dictate to us; they sit with village elders and ask what our youth need most. This is genuine dignity, respect for our culture, and true partnership.",
      author: "Chief Emeka Okafor",
      role: "Community Elder & Development Secretary",
      institution: "Oji River Council, Enugu State",
      avatar: "/images/IMG_0994.JPG"
    },
    {
      category: 'volunteers',
      quote: "Serving as a volunteer doctor on the Kaduna medical mission was the most grounding experience of my clinical career. Seeing 100% of donated drugs reach patients directly restored my faith in grassroots charity.",
      author: "Dr. Chinedu Eze",
      role: "Volunteer Pediatrician",
      institution: "Lagos University Teaching Hospital",
      avatar: "/images/IMG_0294.JPG"
    },
    {
      category: 'donors',
      quote: "What sets TKH apart is their radical financial honesty. Getting an email with GPS coordinates and photos of the exact classroom block my monthly contribution helped build was deeply moving.",
      author: "Farida Mohammed",
      role: "Monthly Impact Sustainer",
      institution: "Abuja, Nigeria",
      avatar: "/images/IMG_0300.JPG"
    },
    {
      category: 'partners',
      quote: "Our diaspora foundation has partnered with Ten Kind Hands across three Nigerian states. Their operational discipline and flawless accounting make them our most trusted on-ground implementation partner.",
      author: "Dr. Anthony Nwankwo",
      role: "Director of International Giving",
      institution: "UK-Nigeria Diaspora Health Trust",
      avatar: "/images/IMG_0994.JPG"
    }
  ];

  const activeTestimonials = testimonialsList?.length > 0 ? testimonialsList : defaultTestimonials;

  const filtered = filter === 'all'
    ? activeTestimonials
    : activeTestimonials.filter((t) => t.category === filter);

  return (
    <div className="pt-8 sm:pt-14 3xl:pt-18 animate-fade-in bg-white pb-16 sm:pb-20 3xl:pb-28">
      {/* Header */}
      <section className="relative py-8 sm:py-12 md:py-16 3xl:py-20 px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 uw:px-20 max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl 4xl:max-w-[1800px] mx-auto text-center overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs 3xl:text-sm uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Authentic Voices
          </span>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-heading font-extrabold text-ink max-w-3xl 3xl:max-w-4xl mx-auto mb-4 tracking-tight leading-tight">
            Letters &amp; Stories from <br />
            <span className="text-primary">Those Who Live the Impact.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg 3xl:text-xl text-ink-light max-w-2xl 3xl:max-w-3xl mx-auto mb-6 leading-relaxed font-normal">
            Read unedited testimonials from community headmistresses, mothers, volunteer doctors, and institutional donor partners.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 3xl:gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 sm:px-5 3xl:px-6 py-2 3xl:py-2.5 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                filter === 'all'
                  ? 'bg-ink text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              All Testimonials ({activeTestimonials.length})
            </button>
            <button
              onClick={() => setFilter('beneficiaries')}
              className={`px-4 sm:px-5 3xl:px-6 py-2 3xl:py-2.5 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                filter === 'beneficiaries'
                  ? 'bg-primary text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Beneficiaries &amp; Schools ({activeTestimonials.filter((t) => t.category === 'beneficiaries').length})
            </button>
            <button
              onClick={() => setFilter('volunteers')}
              className={`px-4 sm:px-5 3xl:px-6 py-2 3xl:py-2.5 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                filter === 'volunteers'
                  ? 'bg-forest text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Volunteer Doctors ({activeTestimonials.filter((t) => t.category === 'volunteers').length})
            </button>
            <button
              onClick={() => setFilter('donors')}
              className={`px-4 sm:px-5 3xl:px-6 py-2 3xl:py-2.5 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                filter === 'donors'
                  ? 'bg-clay text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Donors &amp; Partners ({activeTestimonials.filter((t) => t.category === 'donors' || t.category === 'partners').length})
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Bento Cards: expands to 3, 4, 6 columns on large displays */}
      <section className="relative px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 uw:px-20 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4 uw:grid-cols-6 gap-6 sm:gap-8 3xl:gap-8 4xl:gap-10">
          {filtered.map((t, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-8 3xl:p-9 rounded-3xl bg-white/95 backdrop-blur-xs border border-[#e7e2d8] flex flex-col justify-between shadow-xs hover:border-primary/40 transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 3xl:w-10 3xl:h-10 text-primary/30 mb-4" />
                <p className="text-xs sm:text-sm 3xl:text-base text-ink-light italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0ece8] flex items-center gap-3">
                {t.avatar && (
                  <div className="w-12 h-12 rounded-full bg-[#f9f7f2] border border-[#e5e0d8] p-1 shrink-0 overflow-hidden shadow-2xs flex items-center justify-center">
                    <img
                      src={t.avatar}
                      alt={t.institution || t.author}
                      className="w-full h-full object-contain rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm 3xl:text-base font-heading font-bold text-ink truncate">{t.author}</h4>
                  <p className="text-xs 3xl:text-sm text-ink-muted truncate">{t.role}</p>
                  <span className="text-[11px] 3xl:text-xs text-primary font-medium block truncate mt-0.5">{t.institution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-12 sm:pt-16 3xl:pt-20">
          <button
            onClick={onOpenDonate}
            className="btn-primary w-full sm:w-auto text-xs sm:text-sm 3xl:text-base px-6 sm:px-8 3xl:px-10 py-3.5 3xl:py-4 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md font-heading font-semibold min-h-[44px]"
          >
            <span>Create a New Story of Dignity</span>
            <Heart className="w-4 h-4 3xl:w-5 3xl:h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
