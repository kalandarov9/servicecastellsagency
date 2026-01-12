import { GoogleGenAI, Type } from "@google/genai";
import { ProjectData } from "../types";

// Default fallback data populated with Pioneer Service full context
export const DEFAULT_PROJECT: ProjectData = {
  name: "Pioneer Service",
  description: "Premium HVAC, Appliance & Electrical services for Irvine & Orange County. Focusing on $1.5M+ homes, Daikin tech, and white-glove service.",
  sitemap: {
    id: "root",
    label: "Home (pioneerserv.com)",
    children: [
      { 
        id: "hvac-res", 
        label: "HVAC (Residential)",
        children: [
            { id: "hvac-repair", label: "HVAC Repair" },
            { id: "hvac-install", label: "HVAC Installation" },
            { id: "hvac-maint", label: "HVAC Maintenance" },
            { id: "ac-repair", label: "AC Repair" },
            { id: "ac-install", label: "AC Installation" },
            { id: "ac-maint", label: "AC Maintenance" },
            { id: "heat-pump-repair", label: "Heat Pump Repair" },
            { id: "heat-pump-install", label: "Heat Pump Installation" },
            { id: "heat-pump-maint", label: "Heat Pump Maintenance" },
            { id: "furnace-repair", label: "Furnace Repair" },
            { id: "furnace-install", label: "Furnace Installation" },
            { id: "furnace-maint", label: "Furnace Maintenance" },
            { id: "mini-split-repair", label: "Ductless Mini-Split Repair" },
            { id: "mini-split-install", label: "Ductless Mini-Split Install" },
            { id: "mini-split-maint", label: "Ductless Mini-Split Maint" }
        ]
      },
      { 
        id: "hvac-comm", 
        label: "Commercial HVAC",
        children: [
            { id: "comm-hvac-repair", label: "Comm. HVAC Repair" },
            { id: "comm-hvac-install", label: "Comm. HVAC Install" },
            { id: "comm-hvac-maint", label: "Comm. HVAC Maint" },
            { id: "vrf-sys", label: "VRF / VRV Systems" },
            { id: "rtu-sys", label: "Rooftop Units" }
        ]
      },
      { 
        id: "refrig", 
        label: "Comm. Refrigeration",
        children: [
            { id: "walk-in-cooler", label: "Walk-In Cooler" },
            { id: "walk-in-freezer", label: "Walk-In Freezer" },
            { id: "ice-machine", label: "Ice Machine" },
            { id: "reach-in", label: "Reach-In Fridge" },
            { id: "display-fridge", label: "Display Fridge" },
            { id: "prep-table", label: "Prep Table" },
            { id: "bev-cooler", label: "Beverage Cooler" }
        ]
      },
      { 
        id: "appliance", 
        label: "Appliance Repair",
        children: [
            { id: "app-refrig", label: "Refrigerator Repair" },
            { id: "app-washer", label: "Washer Repair" },
            { id: "app-dryer", label: "Dryer Repair" },
            { id: "app-dish", label: "Dishwasher Repair" },
            { id: "app-oven", label: "Oven/Range Repair" },
            { id: "app-micro", label: "Microwave Repair" },
            { id: "app-ice", label: "Ice Maker Repair" },
            { id: "app-wine", label: "Wine Cooler Repair" },
            { id: "app-garbage", label: "Garbage Disposal" }
        ]
      },
      { 
        id: "electrical", 
        label: "Electrical",
        children: [
            { id: "elec-panel", label: "Panel Upgrade" },
            { id: "elec-ev", label: "EV Charger" },
            { id: "elec-light", label: "Lighting Install" },
            { id: "elec-gfci", label: "GFCI Outlet" },
            { id: "elec-surge", label: "Surge Protection" },
            { id: "elec-gen", label: "Generator Install" }
        ]
      },
      { 
        id: "solar", 
        label: "Solar",
        children: [
            { id: "solar-panel", label: "Panel Install" },
            { id: "solar-batt", label: "Battery Install" },
            { id: "solar-maint", label: "Panel Maintenance" },
            { id: "solar-comm", label: "Commercial Solar" }
        ]
      },
      { 
        id: "areas", 
        label: "Service Areas",
        children: [
            { id: "area-oc", label: "Orange County" },
            { id: "area-la", label: "Los Angeles County" },
            { id: "area-ie", label: "Inland Empire" }
        ]
      },
      { 
        id: "about", 
        label: "About & Trust",
        children: [
            { id: "about-us", label: "About Pioneer" },
            { id: "team", label: "Our Team" },
            { id: "lic", label: "Licenses & Ins" },
            { id: "reviews", label: "Testimonials" },
            { id: "finance", label: "Financing" },
            { id: "careers", label: "Careers" },
            { id: "faq", label: "FAQ" },
            { id: "blog", label: "Blog / Articles" },
            { id: "contact", label: "Contact / Book" }
        ]
      },
      { 
        id: "legal", 
        label: "Legal / Utils",
        children: [
            { id: "privacy", label: "Privacy Policy" },
            { id: "terms", label: "Terms" },
            { id: "cookie", label: "Cookie Policy" },
            { id: "accessibility", label: "Accessibility" },
            { id: "ccpa", label: "CCPA Info" },
            { id: "404", label: "404 Error" },
            { id: "thank-you", label: "Thank You" }
        ]
      }
    ]
  },
  wireframes: [
    {
      id: "home",
      title: "1. Homepage (From PDF Design)",
      sections: [
        { type: "navbar", content: "Top Nav: Services | Installation | Plans | About | Contact", details: "CTA Buttons: [Call 555-555-5555] [Book Service]" },
        { type: "hero", content: "Reliable and Caring Home Service", details: "H1. Subtext: 'Expert HVAC installation, repair & appliance services. Honest. Fast. Professional.' Buttons: [Get Started] [Call Now]. Image: Technician with thumbs up." },
        { type: "features", content: "Stats Bar", details: "4.9/5 Customer Rating | 500+ Happy Clients | 20+ Years Experience | 24/7 Emergency Service" },
        { type: "features", content: "Expert Repair for All Your Appliances", details: "Grid: Refrigerator, Washer & Dryer, Oven & Stove, Dishwasher, HVAC Systems, Microwave. CTA: [All Repair Services]" },
        { type: "content", content: "Air Conditioning Services", details: "Split Layout. Left: List (Central air, Ductless mini-splits, Heat pump, Indoor air quality, Thermostats). Right: Tech working on AC. Button: [View More]" },
        { type: "features", content: "Our Story & Mission", details: "Cards: 'Our Story' (Industry leading climate installation), 'Our Mission' (Innovative design). Stats: 500+ Projects, 20+ Years, 100% Satisfaction." },
        { type: "features", content: "Certified Excellence", details: "Red Banner: EPA Certified, Licensed (Bonded/Insured), Background Checked, Factory Training." },
        { type: "features", content: "New System Installation Pricing", details: "Pricing Cards: Central Air (from $3,999), Mini-Split (from $2,499), Heating (from $3,299). Special Offer Box." },
        { type: "features", content: "Maintenance Plans (Plans that pay for themselves)", details: "Tiers: Silver ($149/yr - 2 annual inspections), Gold ($249/yr - Most Popular, Deep cleaning), Platinum ($399/yr - VIP priority)." },
        { type: "features", content: "Testimonials", details: "Header: 'Hear from our satisfied customers'. Reviews: Sarah Johnson (5 stars), Michael Chen (5 stars), Jennifer Martinez (5 stars). Button: [See All Reviews]" },
        { type: "content", content: "Your Neighborhood HVAC Superheroes", details: "About Text: 'Since 2005...'. Stats: 20+ Years, 500+ Clients, 24/7 Emergency, 100% Satisfaction. Badges: Licensed & Certified, Same-Day Service." },
        { type: "features", content: "Serving Greater Los Angeles", details: "Map Section + Cities List: West Hollywood, Santa Monica, Pasadena, Beverly Hills, Burbank, etc." },
        { type: "cta", content: "Let's Get Started", details: "Footer CTA Block. 'Contact us today for expert HVAC'. Button: [Get Free Quote]. Form Fields: Name, Email, Service Type, Message." },
        { type: "footer", content: "Footer", details: "Logo, Quick Links (Services, HVAC, Appliance), Contact Info, Copyright 2024." }
      ]
    },
    {
      id: "category",
      title: "2. Service Category (e.g. HVAC)",
      sections: [
        { type: "navbar", content: "Sticky Header" },
        { type: "hero", content: "Category Hero", details: "H1: 'Expert Residential HVAC Services'. Sub: Repair, Install, Maintenance." },
        { type: "features", content: "Sub-Service Grid", details: "Links to: AC Repair, Furnace Install, Heat Pumps, Mini-Splits." },
        { type: "content", content: "Why Choose Pioneer?", details: "Text block about 'White Shirt' service, Daikin partnership, and fair pricing." },
        { type: "cta", content: "Maintenance Plan Teaser", details: "Join our membership for priority service." },
        { type: "footer", content: "Footer" }
      ]
    },
    {
      id: "service-detail",
      title: "3. Service Detail (e.g. AC Repair)",
      sections: [
        { type: "navbar", content: "Sticky Header" },
        { type: "hero", content: "Specific Service Hero", details: "H1: 'Daikin Heat Pump Installation in Irvine'. Image: Unit installation close-up (clean)." },
        { type: "content", content: "Problem/Solution", details: "Text: 'Stop overpaying for gas. Switch to ultra-quiet electric.' Explanation of SEER ratings." },
        { type: "features", content: "Key Benefits", details: "List: 12-Year Warranty, 3-Year Labor Guarantee, Energy Rebates." },
        { type: "features", content: "Process", details: "Step 1: Evaluation. Step 2: Install (White Glove). Step 3: Walkthrough." },
        { type: "cta", content: "Specific CTA", details: "Button: 'Check My Rebate Eligibility'." },
        { type: "features", content: "FAQ Section", details: "Accordion: 'How long does install take?', 'What is the noise level?'" },
        { type: "footer", content: "Footer" }
      ]
    },
    {
      id: "commercial",
      title: "4. Commercial / B2B Landing",
      sections: [
        { type: "navbar", content: "Sticky Header" },
        { type: "hero", content: "Business Continuity Focus", details: "H1: 'Commercial Refrigeration & HVAC for OC Businesses'. Image: Walk-in cooler or Rooftop unit." },
        { type: "features", content: "Services List", details: "Walk-ins, Ice Machines, Prep Tables. Emphasize: Same-day emergency response." },
        { type: "content", content: "Maintenance Plans", details: "Pitch for ongoing B2B maintenance contracts to prevent downtime." },
        { type: "features", content: "Client Types", details: "Restaurants, Hotels, Grocery. 'Trusted by [Local Business Names]'." },
        { type: "form", content: "B2B Priority Form", details: "Fields: Business Name, Equipment Type, Urgency." },
        { type: "footer", content: "Footer" }
      ]
    },
    {
      id: "about",
      title: "5. About Us / Team",
      sections: [
         { type: "navbar", content: "Sticky Header" },
         { type: "hero", content: "Our Philosophy", details: "H1: 'Professional Service with a Personal Touch'. Image: Team in uniform." },
         { type: "content", content: "The 'White Shirt' Standard", details: "Story: Why our techs wear white shirts (Cleanliness, Precision, Respect)." },
         { type: "features", content: "Leadership", details: "Bio of Alex & Partners. Focus on honesty and engineering background." },
         { type: "features", content: "Mascot Story", details: "Why the Polar Bear? (Reliability, Cool Comfort)." },
         { type: "cta", content: "Join Our Team", details: "Link to Careers page." },
         { type: "footer", content: "Footer" }
      ]
    },
    {
      id: "areas",
      title: "6. Service Areas (SEO)",
      sections: [
         { type: "navbar", content: "Sticky Header" },
         { type: "hero", content: "Serving Orange County", details: "Map visualization. List of main cities: Irvine, Newport, Lake Forest, etc." },
         { type: "features", content: "City Grid", details: "Links to dynamic city pages (e.g. 'AC Repair in Irvine', 'HVAC in Tustin')." },
         { type: "content", content: "Dispatch Zones", details: "Explanation of arrival times based on zones." },
         { type: "footer", content: "Footer" }
      ]
    },
    {
      id: "blog-list",
      title: "7. Blog Listing",
      sections: [
         { type: "navbar", content: "Sticky Header" },
         { type: "hero", content: "Education Center", details: "H1: 'HVAC Tips & Industry News'. Sub: 'Learn about Heat Pumps and Efficiency'." },
         { type: "features", content: "Article Grid", details: "Cards with thumbnails. Categories: Maintenance, New Tech, Rebates." },
         { type: "cta", content: "Newsletter", details: "Subscribe for seasonal maintenance reminders." },
         { type: "footer", content: "Footer" }
      ]
    },
    {
      id: "blog-post",
      title: "8. Single Article (Template)",
      sections: [
         { type: "navbar", content: "Sticky Header" },
         { type: "hero", content: "Article Title", details: "H1: 'Heat Pumps vs Furnaces: What is right for Irvine?' Date & Author." },
         { type: "content", content: "Main Body", details: "Rich text with H2, H3. Educational images. Comparison tables." },
         { type: "features", content: "Related Services", details: "Sidebar or bottom links to 'Heat Pump Installation'." },
         { type: "cta", content: "Consultation", details: "Have questions? Call an expert." },
         { type: "footer", content: "Footer" }
      ]
    },
    {
      id: "book",
      title: "9. Contact / Book Online",
      sections: [
        { type: "header", content: "Simple Header", details: "Logo only to reduce distraction." },
        { type: "hero", content: "Contact Info", details: "Phone (Click to call), Email, Hours." },
        { type: "form", content: "Housecall Pro Widget", details: "Embedded iframe or direct button to HCP booking flow. 'Book your slot now'." },
        { type: "features", content: "What to expect", details: "Text: 'You will receive a confirmation within 15 mins. Our tech will arrive in uniform.'" },
        { type: "footer", content: "Footer" }
      ]
    },
    {
      id: "legal",
      title: "10. Legal / Privacy Policy",
      sections: [
         { type: "navbar", content: "Sticky Header" },
         { type: "content", content: "Legal Text", details: "Standard Privacy Policy text. CCPA compliance section (Do not sell my info)." },
         { type: "footer", content: "Footer" }
      ]
    },
    {
      id: "404",
      title: "11. 404 Error Page",
      sections: [
         { type: "navbar", content: "Sticky Header" },
         { type: "hero", content: "Page Not Found", details: "Funny image of the Polar Bear looking lost. 'Looks like this page froze over'." },
         { type: "cta", content: "Go Home", details: "Button to Homepage or Book Service." },
         { type: "footer", content: "Footer" }
      ]
    },
    {
      id: "thank-you",
      title: "12. Thank You Page",
      sections: [
         { type: "navbar", content: "Sticky Header" },
         { type: "hero", content: "Success Message", details: "H1: 'Thank you for your request!'. Sub: 'We have received your details.'" },
         { type: "content", content: "Next Steps", details: "1. Confirmation Email. 2. Dispatch Call. 3. Technician Arrival." },
         { type: "features", content: "Emergency?", details: "If this is urgent, please call us immediately at [Phone]." },
         { type: "footer", content: "Footer" }
      ]
    }
  ],
  designSystem: {
    brand: {
      name: "Pioneer Service",
      description: "Premium, Trustworthy, Technology-Driven.",
      logoType: "combined"
    },
    colors: {
      primary: "#0F4C81", // Navy Blue (Trust, Professionalism)
      secondary: "#FF7A59", // HubSpot Orange (Energy, Action)
      surface: "#F8FAFC", // Light Blue-Grey (Cleanliness)
      text: {
        primary: "#111111", // Black
        secondary: "#64748B", // Slate 500
        light: "#FFFFFF"
      },
      semantic: {
        success: "#10B981", // Emerald
        error: "#EF4444", // Red
        warning: "#F59E0B" // Amber
      }
    },
    typography: {
      fontHeading: "Playfair Display",
      fontBody: "Satoshi",
      scale: {
        h1: "text-4xl md:text-5xl font-bold tracking-tight",
        h2: "text-3xl font-bold tracking-tight",
        h3: "text-xl font-semibold",
        body: "text-base leading-relaxed",
        caption: "text-xs font-medium uppercase tracking-wider text-gray-400"
      }
    },
    components: {
      borderRadius: "0.75rem", // Rounded-xl
      buttonStyle: "rounded",
      cardStyle: "elevated"
    },
    assets: {
      iconStyle: "outline",
      imageStyle: "natural"
    }
  }
};

export const generateProjectData = async (description: string): Promise<Partial<ProjectData>> => {
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
  
  if (!apiKey) {
    console.warn("API Key not found in process.env");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-2.5-flash";
  
  // Prompt remains the same, just utilizing the updated service types
  const prompt = `
    Generate a comprehensive web design system and project structure for a client based on this description: "${description}".
    
    Return a JSON object with:
    1. A sitemap (tree structure).
    2. A list of wireframe pages (e.g. Home, About, Services), each with a list of sections.
    3. A detailed design system (colors, typography, component styles).
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sitemap: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                label: { type: Type.STRING },
                children: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        label: { type: Type.STRING },
                    }
                  }
                }
              }
            },
            wireframes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  sections: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING },
                            content: { type: Type.STRING },
                            details: { type: Type.STRING }
                        }
                    }
                  }
                }
              }
            },
            designSystem: {
              type: Type.OBJECT,
              properties: {
                brand: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        logoType: { type: Type.STRING }
                    }
                },
                colors: {
                  type: Type.OBJECT,
                  properties: {
                    primary: { type: Type.STRING },
                    secondary: { type: Type.STRING },
                    surface: { type: Type.STRING },
                    text: {
                        type: Type.OBJECT,
                        properties: {
                            primary: { type: Type.STRING },
                            secondary: { type: Type.STRING },
                            light: { type: Type.STRING }
                        }
                    },
                    semantic: {
                        type: Type.OBJECT,
                        properties: {
                            success: { type: Type.STRING },
                            error: { type: Type.STRING },
                            warning: { type: Type.STRING }
                        }
                    }
                  }
                },
                typography: {
                    type: Type.OBJECT,
                    properties: {
                        fontHeading: { type: Type.STRING },
                        fontBody: { type: Type.STRING },
                        scale: {
                            type: Type.OBJECT,
                            properties: {
                                h1: { type: Type.STRING },
                                h2: { type: Type.STRING },
                                h3: { type: Type.STRING },
                                body: { type: Type.STRING },
                                caption: { type: Type.STRING }
                            }
                        }
                    }
                },
                components: {
                    type: Type.OBJECT,
                    properties: {
                        borderRadius: { type: Type.STRING },
                        buttonStyle: { type: Type.STRING },
                        cardStyle: { type: Type.STRING }
                    }
                },
                assets: {
                    type: Type.OBJECT,
                    properties: {
                        iconStyle: { type: Type.STRING },
                        imageStyle: { type: Type.STRING }
                    }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Partial<ProjectData>;
    }
    return {};
  } catch (error) {
    console.error("Failed to generate project data:", error);
    throw error;
  }
};