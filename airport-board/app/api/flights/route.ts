import { generateFlights } from "@/entities/flight/flights";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const airport = searchParams.get("airport") || "CPH";

  const data = generateFlights(airport);

  return Response.json(data);
}
