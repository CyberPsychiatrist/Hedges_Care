
import { ForumPost } from "@/types/forum";

export const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Mango Tree Care: Maximizing CO2 absorption in urban settings",
    content: "I've just planted several Mangifera indica trees in my urban garden and I'm excited about their potential CO2 absorption rate of 52.5 kg annually! Does anyone have experience with optimizing growth conditions for maximum carbon sequestration? The data suggests they thrive in loamy soil with temperatures around 20.7°C and good rainfall.",
    authorId: "user-1",
    authorName: "ClimateGardener",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-06-15T14:48:00Z",
    tags: ["carbon-sequestration", "mango-trees", "urban-gardening"],
    likes: 28,
    comments: [
      {
        id: "comment-1-1",
        postId: "1",
        authorId: "user-2",
        authorName: "TreeScientist",
        authorAvatar: "/placeholder.svg",
        content: "Great choice! Mango trees can reach up to 16m height with a canopy of 97m². To maximize CO2 absorption, ensure they get full sun and maintain optimal soil moisture. Their annual growth rate of 2.55% also contributes to continuous carbon capture.",
        createdAt: "2025-06-15T15:30:00Z",
        likes: 12
      },
      {
        id: "comment-1-2",
        postId: "1",
        authorId: "user-3",
        authorName: "EcoWarrior",
        authorAvatar: "/placeholder.svg",
        content: "I've noticed that healthy mango trees with proper care can absorb more than the average 52.5kg. My trees in Nairobi are showing 15% higher absorption due to the local climate conditions. Have you considered companion planting under them?",
        createdAt: "2025-06-15T16:15:00Z",
        likes: 19
      }
    ]
  },
  {
    id: "2",
    title: "Jacaranda Trees: Beautiful AND high CO2 absorbers?",
    content: "I'm considering planting Jacaranda mimosifolia trees for their stunning purple flowers, but I'm also interested in their environmental impact. The dataset shows they absorb 28.9 kg CO2 annually. Has anyone measured actual performance in different climate zones? I'm in Ethiopia and wondering if the cooler temperatures (mean 10.16°C) would affect their growth and carbon absorption.",
    authorId: "user-4",
    authorName: "FloraLover",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-06-14T09:15:00Z",
    tags: ["jacaranda", "carbon-footprint", "ornamental-trees"],
    likes: 35,
    comments: [
      {
        id: "comment-2-1",
        postId: "2",
        authorId: "user-5",
        authorName: "UrbanForester",
        authorAvatar: "/placeholder.svg",
        content: "Jacarandas are excellent urban trees! Their drought tolerance and moderate growth rate make them ideal for city environments. In Addis Ababa, I've seen them thrive with minimal care. Their sandy soil preference and lower maintenance needs (12.31 USD/year) are added bonuses.",
        createdAt: "2025-06-14T10:30:00Z",
        likes: 21
      },
      {
        id: "comment-2-2",
        postId: "2",
        authorId: "user-14",
        authorName: "GreenMetrics",
        authorAvatar: "/placeholder.svg",
        content: "I've been tracking my Jacaranda's carbon absorption for 2 years. It consistently absorbs about 32kg annually, exceeding the baseline 28.9kg. The key seems to be proper spacing - their canopy can grow to 7.7m², so give them room!",
        createdAt: "2025-06-14T11:45:00Z",
        likes: 15
      }
    ]
  },
  {
    id: "3",
    title: "Moringa oleifera: Superfood tree with exceptional carbon capture?",
    content: "I'm growing Moringa trees for their nutritional benefits, but I'm impressed by their carbon sequestration potential - 176.7 kg CO2 annually! That's 3x higher than many other trees. Does anyone have experience with optimizing their growth for dual purposes (food + carbon capture)? The data suggests they handle chalky soil well and prefer temperatures around 16°C.",
    authorId: "user-6",
    authorName: "SustainableFarmer",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-06-13T16:45:00Z",
    tags: ["moringa", "food-security", "carbon-capture"],
    likes: 42,
    comments: [
      {
        id: "comment-3-1",
        postId: "3",
        authorId: "user-7",
        authorName: "PermacultureExpert",
        authorAvatar: "/placeholder.svg",
        content: "Moringa is indeed incredible! I've designed a system where I harvest leaves regularly for consumption while the tree continues to sequester carbon. Their rapid growth rate of 5.26% helps maintain high absorption rates. Just be mindful of their root depth (1.4m) when planning your garden layout.",
        createdAt: "2025-06-13T17:20:00Z",
        likes: 25
      },
      {
        id: "comment-3-2",
        postId: "3",
        authorId: "user-15",
        authorName: "CarbonFarmer",
        authorAvatar: "/placeholder.svg",
        content: "My Moringa plantation shows even better results - 185kg CO2 annually! The secret seems to be proper pruning and nutrient management. They respond very well to organic fertilizers, which boosts both leaf production and carbon capture. Have you tried intercropping with nitrogen-fixing plants?",
        createdAt: "2025-06-13T18:30:00Z",
        likes: 18
      }
    ]
  },
  {
    id: "4",
    title: "Weeping Willows (Salix babylonica) for urban carbon sequestration?",
    content: "Considering planting weeping willows in our city's green spaces. The data shows they can absorb up to 81.6 kg CO2 annually with their impressive height (35m+) and large canopy (57m²). However, I'm concerned about their water requirements and maintenance costs (48.85 USD/year). Has anyone implemented these in urban environments successfully? How do they balance carbon capture with water usage?",
    authorId: "user-9",
    authorName: "CityPlanner",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-06-12T11:30:00Z",
    tags: ["urban-forestry", "water-management", "willow-trees"],
    likes: 31,
    comments: [
      {
        id: "comment-4-1",
        postId: "4",
        authorId: "user-10",
        authorName: "Hydrologist",
        authorAvatar: "/placeholder.svg",
        content: "Weeping willows are excellent for riparian zones and can help with water management while sequestering carbon. Their root system (2.18m depth) helps with soil stabilization. In our pilot project, we planted them near stormwater drainage systems where they thrive and provide dual benefits.",
        createdAt: "2025-06-12T12:15:00Z",
        likes: 22
      },
      {
        id: "comment-4-2",
        postId: "4",
        authorId: "user-11",
        authorName: "BudgetConscious",
        authorAvatar: "/placeholder.svg",
        content: "The maintenance cost seems high initially, but willows grow so fast that they start offsetting costs within 2-3 years. Consider coppicing (cutting back every 3-5 years) which stimulates new growth and increases carbon absorption. Our municipality saved 30% on maintenance costs with this approach!",
        createdAt: "2025-06-12T13:40:00Z",
        likes: 16
      }
    ]
  },
  {
    id: "5",
    title: "Comparing carbon sequestration: Deodar Cedar vs other conifers",
    content: "I'm analyzing different conifer species for our reforestation project. Deodar Cedrus deodara shows impressive CO2 absorption (179.5 kg annually) with moderate growth rates. How does this compare to pine and spruce in terms of long-term carbon sequestration? The data suggests they prefer cooler temperatures (18-26°C) and well-drained soil. Any experiences with Deodar cedar in restoration projects?",
    authorId: "user-12",
    authorName: "ReforestationSpecialist",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-06-11T14:10:00Z",
    tags: ["reforestation", "conifers", "carbon-accounting"],
    likes: 38,
    comments: [
      {
        id: "comment-5-1",
        postId: "5",
        authorId: "user-13",
        authorName: "ForestEcologist",
        authorAvatar: "/placeholder.svg",
        content: "Deodar cedars are excellent for carbon projects! Their wood density (0.564 g/cm³) contributes to long-term carbon storage. In our Himalayan restoration sites, they've shown 15% higher survival rates compared to other conifers. Their biodiversity value (0.412) also makes them great for ecosystem restoration.",
        createdAt: "2025-06-11T15:25:00Z",
        likes: 29
      },
      {
        id: "comment-5-2",
        postId: "5",
        authorId: "user-16",
        authorName: "CarbonAnalyst",
        authorAvatar: "/placeholder.svg",
        content: "I've been tracking carbon sequestration across multiple conifer species. Deodar cedars reach peak absorption faster than pines but slower than spruces. However, their longevity means they store carbon for longer periods. The mortality rate (1%) is also much lower than many commercial timber species.",
        createdAt: "2025-06-11T16:50:00Z",
        likes: 24
      }
    ]
  },
  {
    id: "6",
    title: "Terminalia brownii: African indigenous tree with carbon potential?",
    content: "I'm researching indigenous African trees for community carbon projects. Terminalia brownii caught my attention with its biodiversity value (0.286) and moderate carbon absorption (38.7 kg annually). Has anyone worked with this species in restoration projects? The data shows it's vulnerable (VU status) in some regions, making conservation efforts important. Any success stories with propagation techniques?",
    authorId: "user-17",
    authorName: "Conservationist",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-06-10T10:20:00Z",
    tags: ["indigenous-species", "conservation", "african-trees"],
    likes: 25,
    comments: [
      {
        id: "comment-6-1",
        postId: "6",
        authorId: "user-18",
        authorName: "NativePlantExpert",
        authorAvatar: "/placeholder.svg",
        content: "Terminalia brownii is fantastic for restoration! It's nitrogen-fixing and improves soil quality while sequestering carbon. In Kenya, we've used it in agroforestry systems with great success. The key is scarification of seeds before planting - it improves germination rates by 60%.",
        createdAt: "2025-06-10T11:30:00Z",
        likes: 19
      },
      {
        id: "comment-6-2",
        postId: "6",
        authorId: "user-19",
        authorName: "CommunityForester",
        authorAvatar: "/placeholder.svg",
        content: "We've planted Terminalia brownii in 20+ community projects. Their drought tolerance and low maintenance needs make them ideal for areas with limited resources. The local communities value them for both their environmental benefits and traditional medicinal uses.",
        createdAt: "2025-06-10T12:45:00Z",
        likes: 14
      }
    ]
  }
];
