import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      question: "What condition are your items in?",
      answer: "All our items are carefully inspected and graded. We only accept pieces in good to excellent condition. Any flaws or wear are clearly documented in the product description and photos."
    },
    {
      question: "How do you ensure authenticity?",
      answer: "Our team has years of experience in vintage fashion authentication. Each designer piece is thoroughly examined for authenticity markers, construction quality, and provenance."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for items in their original condition. Items must be unworn and in the same condition as received. Return shipping costs are covered for defective items."
    },
    {
      question: "How should I care for vintage items?",
      answer: "Vintage items often require special care. We recommend dry cleaning for most pieces and provide care instructions with each purchase. Avoid harsh detergents and high heat."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship within the United States and Canada. We're working on expanding our shipping options to serve customers worldwide."
    },
    {
      question: "How often do you get new items?",
      answer: "We add new items to our collection weekly. Follow us on social media or subscribe to our newsletter to be the first to know about new arrivals."
    },
    {
      question: "Can I sell my vintage items to you?",
      answer: "Yes! We're always looking for quality vintage pieces. Contact us with photos and descriptions of items you'd like to consign, and we'll get back to you within 24-48 hours."
    },
    {
      question: "Do you offer styling services?",
      answer: "We offer virtual styling consultations to help you create the perfect vintage look. Book a session through our contact page or call us directly."
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-light text-neutral-900 tracking-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-600">
            Everything you need to know about shopping vintage with us
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg">
                <button
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-medium text-neutral-900">{faq.question}</span>
                  {openItem === index ? (
                    <ChevronUp className="h-5 w-5 text-neutral-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-500" />
                  )}
                </button>
                {openItem === index && (
                  <div className="px-6 pb-4">
                    <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;