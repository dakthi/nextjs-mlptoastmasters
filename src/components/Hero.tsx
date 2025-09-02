import OptimizedImage from "@/components/OptimizedImage";
import { SiteSettings } from "@/lib/settings";

interface HeroProps {
  settings?: SiteSettings;
  backgroundImage?: string;
  mainHallCapacity?: string;
}

export function Hero({ settings, backgroundImage, mainHallCapacity }: HeroProps) {
  const siteTitle = settings?.site_title || 'MLP London Bridge Speakers';
  const heroSubtitle = settings?.hero_subtitle || 'Develop your public speaking and leadership skills in London\'s most vibrant Toastmasters club since 2005';
  const membersCount = settings?.members_count || '50+';
  const meetingsPerMonth = settings?.meetings_per_month || '3';
  const yearsActive = settings?.years_active || '20';
  const charterYear = settings?.charter_year || '2005';
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={settings?.hero_background_image || backgroundImage || "/img/placeholder.png"}
          alt={`${siteTitle} Hero Background`}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
            <span className="block text-white drop-shadow-2xl">
              {siteTitle}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {heroSubtitle}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400 mb-1">
                {membersCount}
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium">
                Active Members
              </div>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400 mb-1">
                {meetingsPerMonth}
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium">
                Meetings Per Month
              </div>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400 mb-1">
                {yearsActive}
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium">
                Years Active
              </div>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400 mb-1">
                {charterYear}
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium">
                Chartered Since
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a
              href={settings?.hero_cta_button_link || "/meetings"}
              className="inline-block bg-accent-600 hover:bg-accent-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {settings?.hero_cta_button_text || "Visit as Guest"}
            </a>
            <a
              href="/about"
              className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/30"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}