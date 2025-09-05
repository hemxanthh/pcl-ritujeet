import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-retro">

      {/* Center window */}
      <div className="relative z-10 mx-4 sm:mx-8 w-full max-w-3xl">
        <div className="retro-window">
          {/* Title bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#1f6feb] text-white border-b border-black/20">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-[#ff5f56] rounded-sm shadow-[1px_1px_0_0_#000]" />
              <span className="inline-block w-3 h-3 bg-[#ffbd2e] rounded-sm shadow-[1px_1px_0_0_#000]" />
              <span className="inline-block w-3 h-3 bg-[#27c93f] rounded-sm shadow-[1px_1px_0_0_#000]" />
            </div>
            <span className="text-xs tracking-wider">TTHRIFT</span>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-10 bg-[#fffef8]">
            <h1 className="text-center text-5xl sm:text-6xl font-extrabold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-amber-400 to-purple-500 drop-shadow-[2px_2px_0_#000]">
              TTHRIFT
            </h1>
            <p className="mt-6 mx-auto max-w-xl text-center text-sm sm:text-base text-neutral-800 bg-amber-200 px-4 py-3 rounded shadow-[2px_2px_0_0_#000] border border-black/20">
              ELEVATE YOUR STYLE ON BUDGET
            </p>
            <p className="mt-5 text-center text-xs tracking-wider text-neutral-600">EXPLORE CATEGORIES</p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 place-items-center">
              <Link
                to="/products?category=men"
                className="w-full text-center px-4 sm:px-5 py-2 bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded shadow-[2px_2px_0_0_#000] border border-black/20 hover:translate-y-[1px] hover:translate-x-[1px] transition-transform"
              >
                MEN
              </Link>
              <Link
                to="/products?category=women"
                className="w-full text-center px-4 sm:px-5 py-2 bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded shadow-[2px_2px_0_0_#000] border border-black/20 hover:translate-y-[1px] hover:translate-x-[1px] transition-transform"
              >
                WOMEN
              </Link>
              <Link
                to="/products?category=clothing"
                className="w-full text-center px-4 sm:px-5 py-2 bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded shadow-[2px_2px_0_0_#000] border border-black/20 hover:translate-y-[1px] hover:translate-x-[1px] transition-transform"
              >
                CLOTHING
              </Link>
              <Link
                to="/products?category=accessories"
                className="w-full text-center px-4 sm:px-5 py-2 bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded shadow-[2px_2px_0_0_#000] border border-black/20 hover:translate-y-[1px] hover:translate-x-[1px] transition-transform"
              >
                ACCESSORIES
              </Link>
              <Link
                to="/products?category=shoes"
                className="w-full text-center px-4 sm:px-5 py-2 bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded shadow-[2px_2px_0_0_#000] border border-black/20 hover:translate-y-[1px] hover:translate-x-[1px] transition-transform"
              >
                SHOES
              </Link>
              <Link
                to="/products?category=bags"
                className="w-full text-center px-4 sm:px-5 py-2 bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded shadow-[2px_2px_0_0_#000] border border-black/20 hover:translate-y-[1px] hover:translate-x-[1px] transition-transform"
              >
                BAGS
              </Link>
              <Link
                to="/products?category=ethnic"
                className="w-full text-center px-4 sm:px-5 py-2 bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded shadow-[2px_2px_0_0_#000] border border-black/20 hover:translate-y-[1px] hover:translate-x-[1px] transition-transform"
              >
                ETHNIC
              </Link>
            </div>

            <div className="mt-5 text-center text-[11px] text-neutral-500">
              <span className="mx-2">Free Shipping over $75</span>
              <span className="mx-2">New Drops Weekly</span>
              <span className="mx-2">Sustainable Thrift</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;