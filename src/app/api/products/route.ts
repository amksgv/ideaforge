import { NextRequest, NextResponse } from "next/server";
import { queryProducts } from "@/lib/productRepo";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";
import { ProductsQuerySchema, badRequest, searchParamsToObject } from "@/lib/validation";

export const dynamic = "force-dynamic";

/** JSON mirror of the Digital Product Lab browse page. */
export async function GET(req: NextRequest) {
  const rl = rateLimit(`products:${clientIp(req)}`, { limit: 120, windowMs: 60_000 });
  if (!rl.ok) return tooManyRequests(rl);

  const parsed = ProductsQuerySchema.safeParse(searchParamsToObject(req.nextUrl.searchParams));
  if (!parsed.success) return badRequest(parsed.error);

  const page = await queryProducts(parsed.data as never);
  return NextResponse.json(page, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}
