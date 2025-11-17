export const impactData = [
  {
    value: "6850+",
    description:
      "students have gained the confidence and skills to thrive in a world that often overlooks them. (ICON: Brown graduation hat)",
    number: 6850,
  },
  {
    value: "134+",
    description:
      "Teachers trained by Rabbit School are becoming agents of change, helping to create inclusive classrooms where every child can excel. estimation of trained teachers (ICON: Brown construction blocks)",
    number: 134,
  },
  {
    value: "850+",
    description:
      "students with intellectual disabilities and autism are currently enrolled in our programs.  (ICON: Brown Pencil)",
    number: 850,
  },
  {
    value: "118+",
    description:
      "classrooms are now open to children with special needs across 16 public schools. (ICON: Brown rainbow)",
    number: 118,
  },
];

// export type ImpactItem = {
//   value: number;
//   description: string;
// };

// export async function ImpactData(): Promise<ImpactItem[]> {
//   try {
//     const res = await fetch("http://localhost:3000/api/v1/impact", {
//       cache: "no-store", // 🔑 prevent caching (important for fresh data)
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch impact data");
//     }

//     return res.json();
//   } catch (error) {
//     console.error("Error fetching impact data:", error);
//     return [];
//   }
// }
