import { useState } from 'react';
import { HeartPulse, Droplets, Sun, Home, ShieldAlert } from 'lucide-react';

export default function AdvisoryPage() {
  const [lang, setLang] = useState('en');

  const content = {
    en: {
      title: "Heatwave Health & Safety Advisory",
      subtitle: "Critical guidelines to protect yourself and your family during extreme heat.",
      sections: [
        {
          icon: <Droplets className="w-6 h-6 text-blue-400" />,
          title: "Hydration is Key",
          items: [
            "Drink plenty of water even if you don't feel thirsty.",
            "Avoid alcohol, caffeine, and sugary drinks as they can dehydrate you.",
            "Carry a water bottle whenever you step outside."
          ]
        },
        {
          icon: <Sun className="w-6 h-6 text-yellow-400" />,
          title: "Outdoor Precautions",
          items: [
            "Avoid direct sunlight between 11:00 AM and 4:00 PM.",
            "Wear loose, light-colored, and porous cotton clothes.",
            "Use protective gear like sunglasses, umbrella, or a wide-brimmed hat."
          ]
        },
        {
          icon: <Home className="w-6 h-6 text-green-400" />,
          title: "Indoor Cooling",
          items: [
            "Keep windows and curtains closed during the day.",
            "Use fans and damp clothing to cool down your body.",
            "Take cool showers or baths frequently."
          ]
        },
        {
          icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
          title: "Emergency Signs (Heat Stroke)",
          items: [
            "High body temperature (103°F or higher).",
            "Hot, red, dry, or damp skin.",
            "Fast, strong pulse, dizziness, nausea, or confusion.",
            "Action: Call emergency medical help immediately. Move to a cooler place."
          ]
        }
      ]
    },
    hi: {
      title: "हीटवेव स्वास्थ्य और सुरक्षा परामर्श",
      subtitle: "अत्यधिक गर्मी के दौरान खुद को और अपने परिवार को बचाने के लिए महत्वपूर्ण दिशानिर्देश।",
      sections: [
        {
          icon: <Droplets className="w-6 h-6 text-blue-400" />,
          title: "हाइड्रेशन जरूरी है",
          items: [
            "प्यास न लगने पर भी पर्याप्त पानी पिएं।",
            "शराब, कैफीन और शर्करा युक्त पेय से बचें क्योंकि वे निर्जलीकरण कर सकते हैं।",
            "बाहर निकलते समय हमेशा पानी की बोतल साथ रखें।"
          ]
        },
        {
          icon: <Sun className="w-6 h-6 text-yellow-400" />,
          title: "बाहरी सावधानियां",
          items: [
            "सुबह 11 बजे से शाम 4 बजे के बीच सीधी धूप से बचें।",
            "ढीले, हल्के रंग के और सूती कपड़े पहनें।",
            "धूप का चश्मा, छाता या टोपी जैसे सुरक्षात्मक गियर का उपयोग करें।"
          ]
        },
        {
          icon: <Home className="w-6 h-6 text-green-400" />,
          title: "इनडोर कूलिंग",
          items: [
            "दिन के दौरान खिड़कियां और पर्दे बंद रखें।",
            "शरीर को ठंडा करने के लिए पंखे और नम कपड़ों का प्रयोग करें।",
            "बार-बार ठंडे पानी से नहाएं।"
          ]
        },
        {
          icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
          title: "आपातकालीन संकेत (हीट स्ट्रोक)",
          items: [
            "शरीर का उच्च तापमान (103°F या अधिक)।",
            "गर्म, लाल, सूखी या नम त्वचा।",
            "तेज नाड़ी, चक्कर आना, मतली या भ्रम।",
            "कार्रवाई: तुरंत आपातकालीन चिकित्सा सहायता को कॉल करें। ठंडी जगह पर जाएँ।"
          ]
        }
      ]
    }
  };

  const currentContent = content[lang];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <HeartPulse className="text-[#EF4444] w-8 h-8" />
            {currentContent.title}
          </h1>
          <p className="text-gray-400 mt-2">{currentContent.subtitle}</p>
        </div>
        
        <div className="flex bg-gray-800 p-1 rounded-lg">
          <button 
            onClick={() => setLang('en')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${lang === 'en' ? 'bg-[#F97316] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLang('hi')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${lang === 'hi' ? 'bg-[#F97316] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            हिंदी
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentContent.sections.map((section, idx) => (
          <div key={idx} className="card p-6 bg-gradient-to-br from-[#111827] to-[#1F2937]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-800 rounded-lg border border-gray-700">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold">{section.title}</h3>
            </div>
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#F97316] font-bold mt-0.5">•</span>
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-red-900/20 border border-red-500/30 p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold text-red-400 mb-2">National Emergency Helplines (India)</h3>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <span className="text-gray-400 text-sm block">Medical Emergency</span>
            <span className="text-2xl font-mono font-bold text-white">108</span>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <span className="text-gray-400 text-sm block">National Disaster Response</span>
            <span className="text-2xl font-mono font-bold text-white">1078</span>
          </div>
        </div>
      </div>
    </div>
  );
}
