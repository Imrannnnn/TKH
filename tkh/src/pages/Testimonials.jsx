import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Quote, Heart } from '../components/Icons';

export default function Testimonials({ onOpenDonate }) {
  const { testimonialsList } = useData();
  const [filter, setFilter] = useState('all');

  const defaultTestimonials = [
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
    <div className="pt-8 sm:pt-14 animate-fade-in bg-white pb-16 sm:pb-20">
      {/* Header */}
      <section className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl 2xl:max-w-6xl mx-auto text-center overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Authentic Voices
          </span>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-4 tracking-tight leading-tight">
            Letters &amp; Stories from <br />
            <span className="text-primary">Those Who Live the Impact.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-ink-light max-w-2xl mx-auto mb-6 leading-relaxed font-normal">
            Read unedited testimonials from community headmistresses, mothers, volunteer doctors, and institutional donor partners.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                filter === 'all'
                  ? 'bg-ink text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              All Testimonials (6)
            </button>
            <button
              onClick={() => setFilter('beneficiaries')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                filter === 'beneficiaries'
                  ? 'bg-primary text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Community Leaders &amp; Mothers (3)
            </button>
            <button
              onClick={() => setFilter('volunteers')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                filter === 'volunteers'
                  ? 'bg-forest text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Volunteer Doctors (1)
            </button>
            <button
              onClick={() => setFilter('donors')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                filter === 'donors'
                  ? 'bg-clay text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Donors &amp; Partners (2)
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Bento Cards */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] mx-auto overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((t, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xs border border-[#e7e2d8] flex flex-col justify-between shadow-xs hover:border-primary/40 transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-xs sm:text-sm text-ink-light italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0ece8]">
                <h4 className="text-sm font-heading font-bold text-ink">{t.author}</h4>
                <p className="text-xs text-ink-muted">{t.role}</p>
                <span className="text-[11px] text-primary font-medium block mt-0.5">{t.institution}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-12 sm:pt-16">
          <button
            onClick={onOpenDonate}
            className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-6 sm:px-8 py-3.5 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md font-heading font-semibold min-h-[44px]"
          >
            <span>Create a New Story of Dignity</span>
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
