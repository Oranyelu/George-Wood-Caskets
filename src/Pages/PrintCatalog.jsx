import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Providers/ProductProvider";
import Logo from "../assets/Favicon.svg";

export default function PrintCatalog() {
  const { products } = useContext(ProductContext);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [shouldPrint, setShouldPrint] = useState(false);

  // Group products by category
  const categories = products.reduce((acc, product) => {
    const cat = product.category || "Caskets";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  // Wait for images to load before prompting print dialog
  useEffect(() => {
    if (products.length === 0) return;
    
    const timer = setTimeout(() => {
      setShouldPrint(true);
    }, 2500); // Fail-safe fallback timer

    return () => clearTimeout(timer);
  }, [products]);

  useEffect(() => {
    if (shouldPrint) {
      window.print();
    }
  }, [shouldPrint]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => {
      const next = prev + 1;
      if (next >= products.length) {
        setShouldPrint(true);
      }
      return next;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans p-0 m-0">
      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 1.5cm;
          }
          body {
            background-color: white !important;
            color: #1a202c !important;
          }
          .print-bg-forest {
            background-color: #135B3A !important;
            color: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-text-gold {
            color: #A37E2C !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-border-gold {
            border-color: #A37E2C !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .page-break-after {
            page-break-after: always;
            break-after: page;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* Floating Manual Print Button */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex items-center gap-3">
        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
          {imagesLoaded < products.length 
            ? `Loading catalog assets (${imagesLoaded}/${products.length})...`
            : "Catalog loaded successfully."
          }
        </span>
        <button
          onClick={handlePrint}
          className="bg-[#135B3A] hover:bg-[#0E462D] text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        >
          Print / Save PDF
        </button>
      </div>

      {/* 1. COVER PAGE */}
      <div className="print-bg-forest page-break-after w-full min-h-screen flex flex-col justify-between p-12 text-white border-8 border-[#A37E2C] print-border-gold">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="George Wood Logo" className="h-12 w-auto filter invert brightness-200" />
            <span className="font-serif font-bold text-lg tracking-widest text-[#A37E2C] print-text-gold">GEORGE WOOD CASKET</span>
          </div>
          <span className="text-xs uppercase tracking-widest border border-white/20 px-3 py-1 rounded">EST. 1984</span>
        </div>

        <div className="my-auto text-center max-w-2xl mx-auto flex flex-col gap-6">
          <span className="text-[#A37E2C] print-text-gold font-bold uppercase tracking-widest text-sm">Product Catalogue</span>
          <h1 className="text-5xl md:text-6xl font-serif font-extrabold tracking-tight leading-tight">
            Honouring Life & Legacies
          </h1>
          <div className="w-24 h-1 bg-[#A37E2C] print-bg-forest mx-auto my-2"></div>
          <p className="text-lg text-slate-200 leading-relaxed font-light">
            For over four decades, we have refined the art of craftsmanship, creating timeless caskets that embody love, dignity, and remembrance. Explore our collections hand-crafted to celebrate lives lived.
          </p>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-300">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="font-semibold text-white">GEORGE WOOD CASKET & FUNERAL SERVICES</p>
            <p>11 Senator Avenue, Opposite Milestone Hospital, Okwojo Ngwo, Enugu</p>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-right">
            <p>Phone: +234 814 390 4414</p>
            <p>Email: georgewoodcasket@gmail.com</p>
          </div>
        </div>
      </div>

      {/* 2. CATALOG CONTENT */}
      <div className="max-w-[1000px] mx-auto p-12">
        {Object.entries(categories).map(([categoryName, items]) => (
          <div key={categoryName} className="mb-12">
            {/* Category Header */}
            <div className="border-b-2 border-[#135B3A] pb-3 mb-8 flex justify-between items-end">
              <h2 className="text-3xl font-serif font-bold text-[#135B3A]">{categoryName}</h2>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">{items.length} Designs</span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-8">
              {items.map((product) => (
                <div key={product.id} className="page-break-inside-avoid border border-slate-100 rounded-2xl p-5 flex flex-col gap-4 bg-slate-50/50 shadow-xs">
                  {/* Image wrapper */}
                  <div className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center relative">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      onLoad={handleImageLoad}
                      className="w-full h-full object-cover"
                    />
                    {product.label && (
                      <span className="absolute top-3 left-3 bg-[#A37E2C] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {product.label}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 gap-2">
                    <span className="text-[10px] text-[#135B3A] font-bold uppercase tracking-wider">
                      {product.material || "Premium Selection"}
                    </span>
                    <h3 className="text-base font-serif font-bold text-slate-800 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {product.features && product.features.length > 0 && (
                      <div className="mt-2 pt-3 border-t border-slate-100 flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Key Attributes</span>
                        <ul className="grid grid-cols-1 gap-1">
                          {product.features.slice(0, 3).map((feat, i) => (
                            <li key={i} className="text-[10px] text-slate-600 flex items-start gap-1">
                              <span className="text-[#A37E2C] shrink-0">•</span>
                              <span className="line-clamp-1">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. CATALOG BACK COVER */}
      <div className="print-bg-forest page-break-inside-avoid w-full p-12 text-white text-center border-t-8 border-[#A37E2C] print-border-gold flex flex-col items-center justify-center gap-6 mt-16">
        <img src={Logo} alt="George Wood Logo" className="h-16 w-auto filter invert brightness-200" />
        <h2 className="text-2xl font-serif font-bold tracking-widest text-[#A37E2C] print-text-gold uppercase">George Wood Caskets</h2>
        <div className="w-16 h-0.5 bg-[#A37E2C] print-bg-forest"></div>
        <p className="text-sm font-light text-slate-300 max-w-md">
          Thank you for choosing George Wood. We remain committed to helping you honor your loved ones with utmost respect and dignity.
        </p>
        <p className="text-xs text-slate-400 mt-4">
          © {new Date().getFullYear()} George Wood Caskets. All rights reserved.
        </p>
      </div>
    </div>
  );
}
