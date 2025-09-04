import React from 'react';

const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-6">
            About Vintage
          </h1>
          <p className="text-xl text-neutral-300 leading-relaxed">
            We believe that fashion should be sustainable, unique, and accessible. 
            Every piece in our collection has been carefully curated to bring you 
            the best of vintage and thrift fashion.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light text-neutral-900 tracking-tight mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Founded in 2019, Vintage started as a small passion project to make 
                  sustainable fashion more accessible. We began by carefully selecting 
                  vintage pieces from local thrift stores and estate sales.
                </p>
                <p>
                  Today, we've grown into a curated marketplace that celebrates the 
                  beauty of pre-loved fashion. Every item tells a story, and we're 
                  here to help you continue that narrative.
                </p>
                <p>
                  Our team of fashion enthusiasts hand-picks each piece, ensuring 
                  quality, authenticity, and style that stands the test of time.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                alt="Vintage fashion styling"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-neutral-900 tracking-tight mb-4">
              What We Stand For
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">♻️</span>
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Sustainability</h3>
              <p className="text-neutral-600 leading-relaxed">
                Reducing fashion waste by giving quality pieces a second life. 
                Every purchase contributes to a more sustainable future.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">✨</span>
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Quality</h3>
              <p className="text-neutral-600 leading-relaxed">
                Each item is thoroughly inspected and restored to ensure 
                you receive pieces that will last for years to come.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">💎</span>
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Uniqueness</h3>
              <p className="text-neutral-600 leading-relaxed">
                Stand out with one-of-a-kind pieces that reflect your 
                individual style and personality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;