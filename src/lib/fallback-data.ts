import { PortfolioDataPayload } from "./types";

export const fallbackPortfolioData: PortfolioDataPayload = {
  sourcedFromSupabase: false,
  sections: [
    {
      id: "intro",
      title: "Introduction",
      slug: "introduction",
      description:
        "Soumya Vatsa is a fashion communication designer blending strategic storytelling with tactile experimentation across media.",
      order: 1,
      is_published: true,
      content: [
        {
          id: "intro-1",
          heading: "Creative POV",
          body_text:
            "A detail-obsessed explorer of visuals, culture, and craft — translating layered research into immersive narratives for fashion, lifestyle, and emerging experiences.",
          order: 1,
        },
        {
          id: "intro-2",
          heading: "Toolbox",
          body_text:
            "Adobe Creative Suite · Figma · Blender · Midjourney · Flair · Rapid trend decoding & visual strategy.",
          order: 2,
        },
      ],
      images: [],
    },
    {
      id: "graphic-design",
      title: "Graphic Design",
      slug: "graphic-design",
      description:
        "Print systems, wearable graphics, and bespoke branding built for bold visual impact.",
      order: 2,
      is_published: true,
      content: [
        {
          id: "gd-1",
          heading: "Brand Universes",
          body_text:
            "Crafted cohesive brand kits with motif libraries, typography stacks, and motion-ready assets.",
          order: 1,
        },
        {
          id: "gd-2",
          heading: "Experimental Surfaces",
          body_text:
            "Midjourney + Illustrator workflows used to prototype merch-ready graphics at speed.",
          order: 2,
        },
      ],
      images: [],
    },
    {
      id: "photography",
      title: "Photography",
      slug: "photography",
      description:
        "Fashion styling and lens work focused on mood, composition, and narrative sequencing.",
      order: 3,
      is_published: true,
      content: [
        {
          id: "photo-1",
          heading: "Styling + Light",
          body_text:
            "Shot editorial studies that lean into contrast lighting, layered textures, and cinematic palettes.",
          order: 1,
        },
      ],
      images: [],
    },
    {
      id: "trend-analysis",
      title: "Trend Analysis",
      slug: "trend-analysis",
      description:
        "Research-backed insights mapping cultural shifts to actionable visual directions.",
      order: 4,
      is_published: true,
      content: [
        {
          id: "trend-1",
          heading: "QR Trend Tees",
          body_text:
            "Interactive tees where kids scan QR codes to unlock stories on sustainability — a playful bridge between tech and tactile learning.",
          order: 1,
        },
      ],
      images: [],
    },
    {
      id: "visual-merchandising",
      title: "Visual Merchandising",
      slug: "visual-merchandising",
      description:
        "Immersive space narratives balancing product stories with sensorial cues.",
      order: 5,
      is_published: true,
      content: [
        {
          id: "vm-1",
          heading: "Spatial Storytelling",
          body_text:
            "Composed storefront mockups focusing on movement, color flow, and hero storytelling moments.",
          order: 1,
        },
      ],
      images: [],
    },
    {
      id: "branding",
      title: "Branding",
      slug: "branding",
      description:
        "Identity systems like Vatsya where typography, symbol, and lore align.",
      order: 6,
      is_published: true,
      content: [
        {
          id: "branding-1",
          heading: "Narrative-Driven Logos",
          body_text:
            "Developed wordmarks that adapt across print, motion, and interactive prototypes.",
          order: 1,
        },
      ],
      images: [],
    },
    {
      id: "print-pattern",
      title: "Print & Pattern Design",
      slug: "print-pattern",
      description:
        "Digitally sculpted florals inspired by traditional motifs, deployed across textiles and décor.",
      order: 7,
      is_published: true,
      content: [
        {
          id: "print-1",
          heading: "Living Color",
          body_text:
            "High-saturation compositions designed to wrap garments, walls, and objects seamlessly.",
          order: 1,
        },
      ],
      images: [],
    },
  ],
};

