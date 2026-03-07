// app/locality/[slug]/page.jsx
import LocalityClient from "@/components/locality/LocalityClient";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamicParams = true;

// 1. DATA FETCHING (Cached for 1 hour)
async function getLocality(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/localities/${slug}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

// 2. STATIC PARAMS
// 2. STATIC PARAMS
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/localities?limit=100`, // Added limit to get more slugs
    );
    const response = await res.json();

    // ✅ FIX: Access .data because the API returns an object, not an array
    const localities = response.data || [];

    return localities.map((loc) => ({
      slug: loc.slug,
    }));
  } catch (error) {
    console.error("Error generating params:", error);
    return [];
  }
}
// 3. METADATA
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const locality = await getLocality(slug);
  if (!locality) return { title: "Locality Not Found" };

  const priceText = locality.residential_plot_govt
    ? `Govt Rate: ₹${locality.residential_plot_govt}/sqm`
    : "Check Rates";

  const locationText = locality.tehsil
    ? `${locality.name}, ${locality.tehsil}, Saharanpur`
    : `${locality.name}, Saharanpur`;

  return {
    title: `Property Rates in ${locationText}, Saharanpur | Govt & Market Price`,
    description: `Official Government Circle Rates and Market Value for ${locality.name}, Saharanpur. ${priceText}. Residential & Commercial land prices updated. , Check ${locality.name} mein zameen ka rate`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/locality/${locality.slug}`,
    },
  };
}



  // openGraph: {
  //   title: `Property Rates in ${locality.name}`,
  //   description: `Check latest govt and market rates for ${locality.name}.`,
  //   images: [`/api/og?name=${locality.name}`], // If you have a dynamic OG image route
  // },

  // what i tell where i place teach me 



// 4. MAIN PAGE COMPONENT
export default async function LocalityPage({ params }) {
  const { slug } = await params;

  const locality = await getLocality(slug);

  if (!locality) return notFound();

  const currentYear = new Date().getFullYear();
  const govtRate = locality.residential_plot_govt || "N/A";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: process.env.NEXT_PUBLIC_APP_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locality.name,
            item: `${process.env.NEXT_PUBLIC_APP_URL}/locality/${locality.slug}`,
          },
        ],
      },
      {
        "@type": "Place",
        name: locality.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: locality.tehsil || "Saharanpur",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: locality.lat || "29.9640",
          longitude: locality.lng || "77.5460",
        },
        areaServed: {
          "@type": "City",
          name: "Saharanpur",
        },
        containedInPlace: {
          "@type": "City",
          name: "Saharanpur",
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "p"],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What is the circle rate in ${locality.name} in ${currentYear}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The government circle rate for residential land in ${locality.name}, Saharanpur is ₹${govtRate} per square meter according to official records.`,
            },
          },
          {
            "@type": "Question",
            name: `What is the market price of property in ${locality.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Market prices in ${locality.name} may vary depending on road access, development level, and demand. In many cases market rates are higher than government circle rates.`,
            },
          },
          {
            "@type": "Question",
            name: `Is ${locality.name} a good place to buy property in Saharanpur?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${locality.name} is considered a developing area in Saharanpur with residential and commercial property opportunities depending on location and infrastructure.`,
            },
          },
          {
            "@type": "Question",
            name: `How is stamp duty calculated for property in ${locality.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Stamp duty in Uttar Pradesh is calculated based on the higher of the transaction value or the government circle rate determined for ${locality.name}.`,
            },
          },
          {
            "@type": "Question",
            name: `Saharanpur me property investment ke liye ${locality.name} kaisa area hai?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${locality.name} Saharanpur ka ek developing area hai jahan residential plots aur commercial properties available hain. Infrastructure aur road connectivity ke hisaab se yeh area property investment ke liye consider kiya ja sakta hai.`,
            },
          },
          {
            "@type": "Question",
            name: `Saharanpur me ghar ya plot kharidne ke liye ${locality.name} acha location hai kya?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${locality.name} Saharanpur ke popular residential areas me se ek hai. Yahan plots aur houses available hote hain aur government circle rate ke basis par property registration hota hai.`,
            },
          },
          {
            "@type": "Question",
            name: `${locality.name} Saharanpur me zameen ka rate kya hai?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${currentYear} me ${locality.name}, Saharanpur ka government circle rate residential land ke liye lagbhag ₹${govtRate} per square meter hai. Market rate location aur road connectivity ke hisaab se alag ho sakta hai.`,
            },
          },
        ],
      },
      {
        "@type": "Dataset",
        name: `Property Circle Rates for ${locality.name}`,
        description: `Government and market property valuation data for ${locality.name}, Saharanpur for the year ${currentYear}.`,
        license: "https://igrsup.gov.in",
        variableMeasured: "Price per Square Meter",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Added 'text-center' to main container */}
      <main className="container mx-auto px-4 py-8 max-w-5xl text-center">
        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
            Property Rates & Plots in{" "}
            <span className="text-blue-600">{locality.name}</span>
          </h1>

          {/* ✅ FIXED: Added 'mx-auto' to center the paragraph block */}
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
            Find the latest{" "}
            <strong>{currentYear} official government circle rates</strong>{" "}
            (IGRS UP) compared with real-time <strong>market prices</strong> for{" "}
            {locality.name},{locality.tehsil ? `${locality.tehsil}, ` : ""}{" "}
            {locality.district}. Whether you are looking for residential plots
            or commercial shops, this directory helps you calculate the correct
            stamp duty.
          </p>

          <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-2 inline-block rounded">
            Source: Data derived from{" "}
            <a
              href="https://igrsup.gov.in"
              target="_blank"
              rel="nofollow noopener"
              className="text-blue-600 hover:underline"
            >
              IGRS UP Official Website
            </a>{" "}
            and local market surveys.
          </div>
        </div>

        <LocalityClient slug={slug} initialData={locality} />
      </main>
    </>
  );
}
