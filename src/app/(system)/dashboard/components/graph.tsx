"use client";

import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const awardsData = [
  { name: "Best Picture", uv: 4000, "Number of votes": 2400 },
  { name: "Best Director", uv: 3000, "Number of votes": 2200 },
  { name: "Best Actor", uv: 4500, "Number of votes": 2500 },
  { name: "Best Actress", uv: 4200, "Number of votes": 2300 },
  { name: "Best Supporting Actor", uv: 3500, "Number of votes": 2100 },
  { name: "Best Supporting Actress", uv: 3400, "Number of votes": 2000 },
  { name: "Best Original Screenplay", uv: 3300, "Number of votes": 2200 },
  { name: "Best Adapted Screenplay", uv: 3100, "Number of votes": 2100 },
  { name: "Best Cinematography", uv: 3600, "Number of votes": 2300 },
  { name: "Best Film Editing", uv: 3700, "Number of votes": 2400 },
  { name: "Best Production Design", uv: 3200, "Number of votes": 2200 },
  { name: "Best Costume Design", uv: 3000, "Number of votes": 2100 },
  { name: "Best Makeup and Hairstyling", uv: 3100, "Number of votes": 2200 },
  { name: "Best Visual Effects", uv: 3800, "Number of votes": 2500 },
  { name: "Best Sound Editing", uv: 2900, "Number of votes": 2000 },
  { name: "Best Sound Mixing", uv: 2800, "Number of votes": 1900 },
  { name: "Best Original Score", uv: 3500, "Number of votes": 2300 },
  { name: "Best Original Song", uv: 3300, "Number of votes": 2200 },
  { name: "Best Animated Feature", uv: 4100, "Number of votes": 2400 },
  { name: "Best Documentary Feature", uv: 3400, "Number of votes": 2100 },
  { name: "Best International Feature", uv: 3900, "Number of votes": 2300 },
  { name: "Best Short Film (Animated)", uv: 3200, "Number of votes": 2000 },
  { name: "Best Short Film (Live Action)", uv: 3100, "Number of votes": 2100 },
  { name: "Best Documentary Short", uv: 3000, "Number of votes": 2200 },
  { name: "Best Ensemble Cast", uv: 3700, "Number of votes": 2400 },
];

export default function AnalyticsGraph() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={600}
        data={awardsData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Number of votes"
          stroke="#1b4332"
          fill="#d8f3dc"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
