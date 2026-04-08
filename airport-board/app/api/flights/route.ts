import { generateFlights } from "@/app/src/data/flights";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const airport = searchParams.get("airport") || "CPH";

  const data = generateFlights(airport);

  return Response.json(data);
}
